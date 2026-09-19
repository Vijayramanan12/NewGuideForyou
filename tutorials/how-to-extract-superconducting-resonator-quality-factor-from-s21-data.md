---
title: "How to Extract the Quality Factor of a Superconducting Resonator from S21 Data"
slug: "how-to-extract-superconducting-resonator-quality-factor-from-s21-data"
author: "Vijayaramanan"
date: "2026-09-10"
category: "Tutorial"
tags: [superconducting resonator, quality factor, S21 data, circle fitting, microwave measurement]
readTime: "13 min read"
excerpt: "Learn how to extract resonance frequency and internal quality factor from complex S21 data using bandwidth checks, circle fitting, residual analysis, and reproducible reporting."
description: "Learn how to extract a superconducting resonator quality factor from complex S21 data, validate the fit, separate coupling loss, and avoid common measurement errors."
---

# How to Extract the Quality Factor of a Superconducting Resonator from S21 Data


A superconducting resonator can show an impressive transmission dip while still producing an unreliable quality factor if the frequency sweep is undersampled, the cable background is ignored, or the coupling model is wrong. This tutorial shows **how to extract a superconducting resonator quality factor from complex `S21` data** using a repeatable workflow that starts with a bandwidth sanity check and ends with a documented complex fit.

You will work with a two-port transmission measurement, preserve the raw complex data, estimate the resonance frequency and loaded quality factor, fit the resonance circle, separate internal and coupling loss under an explicit convention, and diagnose whether the result is limited by the device or by the measurement chain. The workflow is intended for microwave engineers, cryogenic experimentalists, quantum-device researchers, and advanced students who already have a VNA data file or are preparing to acquire one.

The method is useful because the quality factor is not just a property of the resonator. The measured response also contains cable delay, impedance mismatch, calibration error, background transmission, noise, and coupling. Primary studies describe circle fitting as a practical way to extract resonator parameters from complex scattering data, while later work shows that point distribution and background handling can materially affect fitting accuracy. [1] [2]

> This guide concerns data analysis and measurement interpretation. Cryogenic systems, microwave sources, vacuum equipment, and high-power RF hardware require trained operators and institution-approved safety procedures.

## Table of Contents

- [What the quality factors mean](#what-the-quality-factors-mean)
- [Prerequisites and requirements](#prerequisites-and-requirements)
- [Step 1: Define the measurement and preserve the raw data](#step-1-define-the-measurement-and-preserve-the-raw-data)
- [Step 2: Check the S21 file and measurement settings](#step-2-check-the-s21-file-and-measurement-settings)
- [Step 3: Locate the resonance and estimate the linewidth](#step-3-locate-the-resonance-and-estimate-the-linewidth)
- [Step 4: Remove or model the measurement background](#step-4-remove-or-model-the-measurement-background)
- [Step 5: Plot the resonance in the complex plane](#step-5-plot-the-resonance-in-the-complex-plane)
- [Step 6: Fit the resonance circle and extract Q](#step-6-fit-the-resonance-circle-and-extract-q)
- [Step 7: Validate the result with residuals and repeated fits](#step-7-validate-the-result-with-residuals-and-repeated-fits)
- [Step 8: Test power, temperature, and calibration dependence](#step-8-test-power-temperature-and-calibration-dependence)
- [Expected output](#expected-output)
- [Troubleshooting and common pitfalls](#troubleshooting-and-common-pitfalls)
- [Pro tips and best practices](#pro-tips-and-best-practices)
- [Summary and next steps](#summary-and-next-steps)
- [References](#references)

## What the quality factors mean

The quality factor describes how much electromagnetic energy a resonator stores relative to how much it loses. For a resonator coupled to an external microwave circuit, the measured loaded quality factor `Q_l` combines internal dissipation and coupling loss:

$$
\frac{1}{Q_l} = \frac{1}{Q_i} + \frac{1}{Q_c}
$$

Here, `Q_i` is the internal quality factor associated with losses inside or near the resonator, and `Q_c` is the coupling quality factor associated with energy escaping into the measurement circuit. The exact relationship and fit convention can become more complicated when the coupling is asymmetric, reactive, or frequency-dependent. [1] [3]

The resonance frequency is `f_r`. Under the simple isolated-resonance approximation, the loaded quality factor can be estimated from the full width at half maximum in power:

$$
Q_l \approx \frac{f_r}{\Delta f_{3\text{dB}}}
$$

This bandwidth estimate is valuable as a diagnostic. It should not automatically replace a complex fit for a high-Q resonator because cable delay, asymmetric line shapes, overlapping modes, and background variation can shift the apparent minimum and linewidth.

A complex `S21` fit uses both magnitude and phase. In the complex plane, a well-behaved isolated resonance traces a circle after suitable normalization. The circle’s position, diameter, rotation, and frequency-dependent phase contain information about coupling and loss. Probst and colleagues describe an algebraic circle-fit approach with diameter correction for robust analysis under noise. [1]

## Prerequisites and requirements

| Requirement | Practical choice | Purpose |
|---|---|---|
| Raw data | Complex `S21(f)` exported as Touchstone, CSV, or equivalent | Provides amplitude and phase across the resonance. |
| Measurement system | VNA and a two-port resonator measurement | Generates and records the transmission response. |
| Calibration record | Calibration type, date, standards, reference plane, and cable state | Determines which systematic errors may remain. |
| Analysis environment | Spreadsheet for checks; Python, MATLAB, or fitting software for complex analysis | Enables reproducible calculations and residual inspection. |
| Metadata | Frequency units, source power, temperature, IF bandwidth, averaging, and device identifier | Makes the result interpretable and repeatable. |
| Background reference | Off-resonance points or a separate through/reference measurement | Helps distinguish the resonator from the microwave path. |

This tutorial does not require a particular VNA brand or a particular cryostat. Instrument-specific export formats and calibration menus vary. The analysis must therefore begin by reading the file header and measurement notes rather than assuming a fixed column order or frequency unit.

## Step 1: Define the measurement and preserve the raw data

Create a new analysis directory for each measurement session. Store the original file without editing it. A useful record contains the device identifier, date, temperature, source-power setting, VNA channel, calibration state, sweep span, number of points, IF bandwidth, averaging, and the exact file name.

Use a structure such as:

```text
resonator_run_2026-09-10/
├── raw/
│   └── device01_S21_4K2_lowpower.s2p
├── metadata/
│   └── measurement-notes.md
├── analysis/
│   ├── cleaned-data.csv
│   ├── fit-results.csv
│   └── fit-figure.png
└── calibration/
    └── vna-calibration-notes.txt
```

Do not overwrite the raw file with background-corrected data. If a later fit fails, you need to know whether the failure came from the measurement, the conversion, the normalization, or the fitting model.

Before analysis, answer three questions:

1. Is this a two-port transmission measurement, so that `S21` is the appropriate parameter?
2. Was the VNA calibrated at the resonator reference plane, or do cryostat cables remain in the response?
3. Is the resonance expected to be linear at the chosen power, or could the device be power-dependent or nonlinear?

The answers determine how much confidence you can place in `Q_i`, even when the fitted curve looks excellent.

## Step 2: Check the S21 file and measurement settings

Inspect the first rows of the exported file and identify the frequency column and the complex transmission representation. Common formats include real and imaginary `S21`, magnitude and phase, or logarithmic magnitude with phase. Confirm whether the frequency is expressed in hertz, kilohertz, megahertz, or gigahertz.

If the file provides magnitude in decibels and phase in degrees, convert it to a complex number:

$$
S_{21}(f) = 10^{M_{\mathrm{dB}}(f)/20}e^{j\phi(f)\pi/180}
$$

where `M_dB` is the voltage-wave magnitude in decibels and `φ` is phase in degrees. The factor of 20 is appropriate for an amplitude-like S-parameter magnitude; do not use 10 unless you are explicitly converting a power ratio.

If the file already contains real and imaginary parts, use them directly. Avoid reconstructing phase after aggressive phase wrapping or rounding. A complex fit is sensitive to small errors in both quadratures.

Make a first plot with four panels:

| Panel | Plot |
|---|---|
| 1 | `20 log10(|S21|)` versus frequency |
| 2 | Unwrapped phase versus frequency |
| 3 | Real `S21` versus imaginary `S21` |
| 4 | Measurement point index or frequency spacing |

The fourth panel is easy to overlook. A sweep with too few points across a narrow resonance cannot support a reliable linewidth or circle fit, regardless of how smooth the plotted line appears after interpolation.

## Step 3: Locate the resonance and estimate the linewidth

Find the resonance region from the magnitude plot. Depending on the coupling geometry, the feature may appear as a dip, peak, asymmetric response, or Fano-like line shape. Do not assume that the minimum of `|S21|` is exactly the resonance frequency in the presence of impedance mismatch or a sloped background.

Use the apparent feature only to choose an initial fit window. The window should include the full resonance and enough off-resonance data to estimate the local baseline. If the span is too narrow, the baseline becomes unconstrained. If it is too wide, the cable response or neighboring mode may vary substantially inside the window.

For an initial bandwidth check:

1. Convert `S21` to transmitted power proportional to `|S21|²`.
2. Identify the off-resonance baseline using points away from the feature.
3. Determine the half-power crossings using the appropriate dip or peak convention.
4. Calculate `Δf` between the crossings.
5. Estimate `Q_l ≈ f_r/Δf`.

Treat this result as a diagnostic, not necessarily the final answer. If the bandwidth estimate changes strongly when you move the baseline or fit window, the response is not adequately described by a simple 3 dB calculation.

## Step 4: Remove or model the measurement background

The measured response can be represented conceptually as

$$
S_{21,\mathrm{meas}}(f) = B(f)\,S_{21,\mathrm{res}}(f)
$$

where `B(f)` is the complex background from cables, connectors, amplifiers, filters, and calibration residuals, and `S21,res` is the resonator response. The exact model used by a fitting package may represent the background differently, for example with a complex delay and a low-order polynomial.

Use one of the following approaches, and record which one you used:

| Approach | Appropriate when | Limitation |
|---|---|---|
| Local off-resonance normalization | Background varies slowly across a narrow window | Can fail when phase delay or baseline curvature is significant. |
| Separate through/reference measurement | A comparable path without the resonator is available | The reference must reproduce the same cables, connectors, and conditions. |
| Complex baseline in the fit | The response has measurable phase slope or amplitude curvature | Adds parameters and can make the fit underconstrained. |
| Cryogenic/in-situ calibration | Standards or reference structures are available at the relevant plane and temperature | More demanding experimentally; calibration uncertainty must be documented. |

Do not normalize the magnitude alone and then claim that the complex response has been calibrated. Magnitude-only correction cannot recover a missing phase reference.

For a quick local normalization, select off-resonance points on both sides of the feature and fit a smooth complex baseline. Avoid fitting through the resonance itself. If no stable off-resonance region exists because of overlapping modes, use a broader physical model or report that the isolated-resonance assumption is not valid.

## Step 5: Plot the resonance in the complex plane

Plot `Re(S21)` on the horizontal axis and `Im(S21)` on the vertical axis. As frequency sweeps through an isolated resonance, the points should trace an approximately circular arc after background handling. The direction of travel is also informative; color the points by increasing frequency if your plotting software supports it.

A useful complex-plane diagnostic table is:

| Observation | Likely interpretation |
|---|---|
| Nearly circular arc with small scatter | A circle-based fit may be appropriate. |
| Strongly tilted or stretched arc | Cable delay, impedance mismatch, incomplete normalization, or reactive coupling. |
| Two loops or a kink | Overlapping modes, mode splitting, or a frequency-dependent background. |
| Cloud of points with no clear arc | Insufficient signal-to-noise ratio, unstable sweep, or incorrect complex conversion. |
| Repeated arcs shifted between sweeps | Drift, cable movement, temperature change, or source-power effect. |

This plot is one of the most valuable checks in the workflow because a magnitude trace can look reasonable even when the complex response is not fit-ready. Do not force a circle model onto a response that visibly contains multiple modes or a large unresolved background structure.

## Step 6: Fit the resonance circle and extract Q

A circle fit estimates the geometric circle traced by the complex resonance response. The fitted circle is then combined with the frequency-dependent phase response and a resonator model to estimate `f_r`, `Q_l`, `Q_i`, and `Q_c`. Probst et al. describe a robust algebraic approach, while Baity et al. show that fitting accuracy depends on point distribution and background treatment. [1] [2]

The exact equations vary by geometry and fit convention. A generic analysis sequence is:

1. Fit the complex data to a circle or circle-plus-background model.
2. Estimate the off-resonance complex baseline and cable delay.
3. Transform the circle to a normalized coordinate system.
4. Fit the phase progression versus frequency.
5. Extract the resonance frequency and loaded linewidth.
6. Determine the coupling response under the chosen model.
7. Calculate internal loss from the loaded and coupling contributions.

The loaded quality factor can be represented through the fitted linewidth:

$$
Q_l = \frac{f_r}{\kappa_f}
$$

where `κ_f` is the full-width frequency scale used by the model. Do not mix a linewidth defined in angular frequency with one defined in hertz without the appropriate factor of `2π`.

For a simple real-coupling approximation, the reciprocal relation is:

$$
Q_i = \left(\frac{1}{Q_l} - \frac{1}{Q_c}\right)^{-1}
$$

This formula is only as meaningful as the `Q_c` model. If the coupling is complex or asymmetric, use the convention documented by the fitting method. Report the method name, fit range, background treatment, and whether `Q_c` is treated as a real or complex parameter.

Keep the calculation transparent. A final fit-results record should contain:

```text
resonance_frequency_hz = ...
loaded_Q = ...
internal_Q = ...
coupling_Q = ...
fit_window_hz = [..., ...]
background_model = ...
parameter_convention = ...
fit_software_version = ...
```

Do not fill missing values with a plausible-looking number. If `Q_i` is not identifiable under the chosen model, report `Q_l` and explain why the internal/coupling decomposition is underconstrained.

## Step 7: Validate the result with residuals and repeated fits

A fit is not validated by overlaying one smooth line on the magnitude trace. Inspect the residual in all relevant representations:

$$
r(f) = S_{21,\mathrm{meas}}(f) - S_{21,\mathrm{fit}}(f)
$$

Plot the real and imaginary residuals against frequency, the magnitude residual in decibels, and the residuals in the complex plane. Look for structured patterns rather than focusing only on the root-mean-square value. A low average residual can hide a systematic phase error if the residual oscillates or changes sign across the resonance.

Repeat the fit after making controlled changes:

| Change | What it tests |
|---|---|
| Narrower and wider fit windows | Sensitivity to baseline and neighboring modes |
| Different initial guesses | Whether the optimizer is trapped in a local solution |
| Excluding obvious outliers | Influence of glitches or dropped samples |
| Different point weighting | Sensitivity to uneven noise across the sweep |
| Independent repeated sweep | Temporal and instrument repeatability |
| Alternative accepted fit model | Model dependence of `Q_i` and `Q_c` |

The fitted `Q_l` should not change arbitrarily under small reasonable changes to the fit window. If it does, investigate the data before reporting a high-precision result. For `Q_i` and `Q_c`, model sensitivity can be larger; report it rather than hiding it.

Estimate uncertainty from repeated fits and, where possible, propagate uncertainty from frequency resolution, calibration, background correction, and model choice. The smallest formal optimizer error is not automatically the total experimental uncertainty.

## Step 8: Test power, temperature, and calibration dependence

Repeat the analysis across a controlled sweep of one experimental variable at a time. At minimum, compare repeated low-power measurements and document the applied VNA power, attenuation assumptions, device temperature, and thermalization state.

A practical measurement matrix is:

| Series | Variable changed | Keep fixed |
|---|---|---|
| Power sweep | Source power | Temperature, fit window, calibration, frequency grid |
| Temperature sweep | Device-stage temperature | Power, calibration, frequency grid, measurement geometry |
| Calibration check | Calibration or reference method | Device state, sweep settings, cable positions |
| Repeatability check | Nothing intentionally changed | Everything |

A change in `Q_i` may reflect device physics, heating, quasiparticle generation, trapped magnetic flux, mechanical movement, calibration drift, or an analysis artifact. A single trend is not enough to identify the mechanism.

For cryogenic work, record the temperature at the device stage and any relevant intermediate stages. A stable mixing-chamber or cold-stage sensor does not prove that the resonator package has reached equilibrium. If the resonance shifts during repeated sweeps, compare the time history with temperature and source-power logs.

## Expected output

The result should be a compact, auditable report rather than only a plotted resonance. Use a table like this, replacing placeholders with measured values:

| Quantity | Result |
|---|---:|
| Device identifier | `...` |
| Measurement parameter | `S21` |
| Temperature | `... K` |
| Source power | `... dBm at VNA` |
| Resonance frequency | `... Hz` |
| Loaded quality factor `Q_l` | `...` |
| Internal quality factor `Q_i` | `...` |
| Coupling quality factor `Q_c` | `...` |
| Fit window | `...–... Hz` |
| Background model | `...` |
| Calibration reference plane | `...` |
| Fit residual metric | `...` |
| Repeatability or uncertainty | `...` |

Also archive the raw file, cleaned file, calibration record, fit configuration, residual plots, and any excluded-point list. The expected output is not a universal Q value; it is a reproducible measurement with enough metadata for another engineer to understand what was actually extracted.

## Troubleshooting and common pitfalls

| Problem | Cause | Solution |
|---|---|---|
| The 3 dB estimate and circle-fit `Q_l` disagree strongly | Sloped background, asymmetric coupling, wrong half-power baseline, or undersampling | Inspect the complex plane, model the background, increase point density, and treat the bandwidth result as a sanity check. |
| The resonance circle is visibly distorted | Cable delay, impedance mismatch, reactive coupling, or incomplete calibration | Include a delay/background model, verify the calibration plane, and compare with a reference measurement. |
| `Q_i` is negative or physically implausible | Coupling decomposition is wrong, `Q_c` is poorly constrained, or fit conventions were mixed | Check the model and units; report `Q_l` alone if the decomposition is not identifiable. |
| Fit results change when a few points are removed | Noise, glitches, outliers, or a fit window that is too narrow | Improve SNR, inspect raw data, use a documented weighting/outlier policy, and report sensitivity. |
| The complex trace is a cloud instead of a circle | Incorrect phase conversion, low SNR, unstable source, or no isolated resonance | Verify file parsing, repeat the sweep, increase averaging within safe limits, and widen the search for a clean mode. |
| The magnitude trace has two nearby dips | Overlapping modes or mode splitting | Do not fit a single isolated-resonance model; resolve the modes or use a multi-mode model. |
| A smooth fit has structured residuals | The model is missing baseline curvature, Fano interference, or frequency-dependent coupling | Inspect residuals and expand or change the physical model; do not hide the structure with excessive polynomial order. |
| Q changes after a cable is moved | The cable phase and impedance changed after calibration | Secure the path, repeat the calibration or reference measurement, and separate the data sets. |
| Repeated sweeps drift in frequency | Thermal drift, source heating, trapped flux, mechanical motion, or device nonlinearity | Log time and temperature, reduce power, wait for equilibrium, and repeat under controlled conditions. |
| The analysis script reports a unit error | Frequency is in GHz or MHz while the fit assumes Hz, or linewidth uses angular frequency | Convert units at the input boundary and display the interpreted range before fitting. |

## Pro tips and best practices

**Use complex data whenever possible.** Magnitude-only fitting discards phase information that can reveal cable delay, coupling asymmetry, and background errors. If the VNA exports phase, preserve it at full available precision.

**Do not oversell internal Q.** `Q_l` is often more directly constrained by the measured linewidth. `Q_i` depends on how coupling and background are modeled. Report the fit convention and uncertainty rather than treating `Q_i` as a model-free observable.

**Control the point distribution.** A very high-Q feature may occupy a small fraction of a broad sweep. Use a search sweep to locate the resonance, then acquire a dedicated high-resolution sweep with enough points across the linewidth. Recent work specifically examines how point redistribution can improve circle-fit accuracy. [2]

**Keep the calibration plane explicit.** A room-temperature VNA calibration does not automatically remove every error from a cryogenic cable and fixture. For a high-precision loss measurement, consider an in-situ or data-based cryogenic calibration when suitable standards or reference structures are available. [3] [4]

**Use the simplest adequate model.** Extra baseline parameters can absorb real device features and produce a deceptively small residual. Start with a physically justified model, then add complexity only when the residual structure shows that it is needed.

**Separate analysis uncertainty from physical variation.** If repeated fits of the same sweep vary, the issue may be numerical. If repeated sweeps under nominally identical conditions vary, the issue may be experimental. Test both before assigning the variation to microscopic loss physics.

**Make the analysis executable.** Save the fitting configuration and a short README containing the input filename, units, fit window, background method, excluded points, software version, and output convention. A future reanalysis should not require guessing which buttons were clicked.

For related reading, continue with New Guide’s [Tutorials and Technical Guides](https://newguideforyou.vercel.app/posts?filter=tutorials) and the site’s research topic on high-Q superconducting-resonator cryogenic calibration.

## Summary and next steps

To extract a superconducting-resonator quality factor from `S21` data, first preserve the raw complex sweep and its measurement metadata. Confirm the units and file format, locate the resonance, use a 3 dB bandwidth only as a sanity check, model the complex background, inspect the resonance circle, and perform a documented complex fit.

The final result should include `f_r`, `Q_l`, `Q_i`, and `Q_c` only when the selected model supports them. Validate the fit with complex residuals, window sensitivity, repeated sweeps, and controlled power or temperature tests. A visually good magnitude overlay is not sufficient evidence of a reliable internal quality factor.

The logical next project is to compare the same resonator under two calibration conditions—room-temperature reference-plane calibration and a cryogenic or in-situ reference where available. That comparison separates analysis uncertainty from measurement-chain uncertainty and shows whether the reported loss is truly device-limited.

## References

[1]: https://arxiv.org/abs/1410.3365 "S. Probst et al., Efficient and robust analysis of complex scattering data under noise in microwave resonators, arXiv:1410.3365; journal reference, Review of Scientific Instruments 86, 024706 (2015)."
[2]: https://link.aps.org/doi/10.1103/PhysRevResearch.6.013329 "P. G. Baity et al., Circle fit optimization for resonator quality factor measurements: Point redistribution for maximal accuracy, Physical Review Research 6, 013329 (2024)."
[3]: https://www.nist.gov/publications/cryogenic-single-port-calibration-superconducting-microwave-resonator-measurements "H. Wang et al., Cryogenic single-port calibration for superconducting microwave resonator measurements, NIST publication page, 2021."
[4]: https://pubs.aip.org/aip/rsi/article/91/9/091101/906092 "C. R. H. McRae et al., Materials loss measurements using superconducting microwave resonators, Review of Scientific Instruments 91, 091101 (2020)."
