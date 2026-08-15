---
title: "Passive Radiative Cooling: The Physics of Cooling Without Power"
slug: "passive-radiative-cooling-physics-without-power"
author: "Vijayaramanan"
date: "2026-08-15"
category: "Applied Engineering & Physics"
tags: [radiative cooling, thermal engineering, photonics, sustainable technology]
readTime: "10 min"
excerpt: "How engineered surfaces reflect sunlight, emit infrared radiation through the atmospheric window, and reject heat to space without a compressor, refrigerant, or electrical input."
---

# Passive Radiative Cooling: The Physics of Cooling Without Power

An air conditioner cools a room by spending electricity to move heat somewhere else. A radiative cooler takes a more radical route: it sends heat upward, as infrared photons, through a transparent band in the atmosphere and into cold outer space. No compressor turns. No refrigerant circulates. The cooling surface simply exchanges more heat with the sky than it receives from its surroundings.

That idea is not speculative. Earth’s surface already loses heat this way on clear nights. The engineering challenge is to make the same mechanism work **during the day**, when sunlight is delivering a far larger energy flux to the surface than the surface can normally radiate away. Modern radiative-cooling materials solve that conflict by separating two optical jobs: they reflect sunlight and emit thermal radiation in the narrow part of the infrared spectrum that the atmosphere transmits efficiently. [1] [2]

The result is a class of materials that can cool roofs, fluids, vehicles, solar modules, electronics, textiles, and other surfaces without consuming power at the point of cooling. Their performance is real, but it is conditional. Clouds, humidity, convection, dust, orientation, and the quality of the optical design all matter. Passive radiative cooling is best understood not as a magical replacement for every air conditioner, but as a carefully engineered heat-rejection pathway.

## Table of Contents

- [The basic idea: cooling by radiation](#the-basic-idea-cooling-by-radiation)
- [Why the atmosphere has a cooling window](#why-the-atmosphere-has-a-cooling-window)
- [The daytime design problem](#the-daytime-design-problem)
- [The governing energy balance](#the-governing-energy-balance)
- [How materials control light and heat](#how-materials-control-light-and-heat)
- [What experiments have demonstrated](#what-experiments-have-demonstrated)
- [Where the technology can be used](#where-the-technology-can-be-used)
- [The limits engineers must design around](#the-limits-engineers-must-design-around)
- [The broader significance](#the-broader-significance)

## The basic idea: cooling by radiation

Every object above absolute zero emits electromagnetic radiation. At ordinary environmental temperatures, most of that emission lies in the mid-infrared, with wavelengths of several micrometres to a few tens of micrometres. A surface cools radiatively when the energy it emits exceeds the thermal radiation it absorbs from the atmosphere and nearby objects.

This is a heat balance, not a violation of the second law of thermodynamics. A warm surface radiates toward a colder radiative environment, so the net heat flow is outward. In radiative sky cooling, the relevant cold reservoir is not merely the air immediately above the surface. It is the sky as seen through the atmosphere, ultimately coupled to the coldness of outer space. [2] [3]

A clear night makes the effect familiar. A roof, leaf, or car windshield can become colder than the surrounding air because it radiates heat upward while receiving comparatively little infrared energy back from a clear sky. The air may remain warmer because convection and conduction do not force the surface and atmosphere to the same temperature instantly.

The phrase **passive radiative cooling** describes the absence of an externally powered refrigeration cycle. It does not mean that a complete cooling system can never contain pumps, fans, controls, insulation, or backup equipment. A radiative panel can reject heat without electricity; an integrated building system may still use auxiliary components.

## Why the atmosphere has a cooling window

The atmosphere is not equally transparent at every infrared wavelength. Water vapour, carbon dioxide, ozone, and other constituents absorb and re-emit thermal radiation in different spectral bands. Between roughly **8 and 13 micrometres**, under favorable conditions, atmospheric transmission is comparatively high. This region is known as the **long-wave infrared atmospheric window**. [1] [2]

The window is especially useful because it overlaps the thermal-emission spectrum of surfaces near room temperature. Wien’s displacement law gives the wavelength of maximum blackbody emission as

\[
\lambda_{\max} = \frac{b}{T},
\]

where \(\lambda_{\max}\) is the peak wavelength, \(T\) is absolute temperature in kelvin, and \(b \approx 2.898 \times 10^{-3}\ \text{m K}\) is Wien’s displacement constant. For a surface near 300 K, the peak is approximately 9.7 micrometres—almost at the center of the atmospheric window.

This spectral coincidence is the central opportunity. A radiative cooler does not need to emit equally well at every wavelength. It should emit strongly where the atmosphere is transparent and avoid absorbing radiation in bands where the atmosphere glows downward toward the surface.

The atmosphere is therefore both a **window and a filter**. In a dry, clear sky, more of the desired infrared radiation can escape. In humid or cloudy conditions, water vapour and cloud droplets increase the effective infrared emission of the sky, making the radiative environment warmer and reducing the net cooling benefit. [2] [3]

## The daytime design problem

Nighttime radiative cooling is comparatively straightforward because the Sun is absent. Daytime cooling is much harder: sunlight arrives with an irradiance that can approach a kilowatt per square metre under strong conditions, while the useful thermal-radiation band occupies only part of the infrared spectrum. Any solar absorption can overwhelm the surface’s radiative heat loss.

A daytime radiative cooler must therefore satisfy two apparently competing requirements:

| Spectral region | Engineering objective | Physical reason |
|---|---|---|
| Solar wavelengths, approximately 0.3–2.5 µm | Reflect as much as possible | Absorbed sunlight becomes heat in the cooler. |
| Atmospheric window, approximately 8–13 µm | Emit strongly | Thermal radiation can pass through the atmosphere toward space. |
| Infrared wavelengths outside the window | Control emission and absorption carefully | Atmospheric gases can return substantial downwelling radiation to the surface. |
| Non-optical heat-transfer paths | Suppress conduction and convection | Heat leaking in from air, supports, and nearby structures reduces net cooling. |

The key distinction is between **solar reflectance** and **thermal emittance**. A material can look white because it reflects visible light yet perform poorly as a daytime radiative cooler if it absorbs near-infrared sunlight or does not emit effectively in the atmospheric window. Conversely, a photonic structure can be designed to reflect solar radiation while presenting a high-emissivity band in the mid-infrared. [2] [3]

## The governing energy balance

At steady state, the cooler settles at the temperature where all incoming and outgoing heat flows balance. A useful area-normalized form is

\[
q_{\text{net}}(T_s) = q_{\text{rad,out}}(T_s)
- q_{\text{atm,down}}(T_a)
- q_{\text{solar}}
- h_c(T_a-T_s),
\]

where:

| Symbol | Meaning |
|---|---|
| \(T_s\) | Surface temperature of the radiative cooler |
| \(T_a\) | Ambient air temperature |
| \(q_{\text{rad,out}}\) | Thermal radiation emitted by the surface toward the sky |
| \(q_{\text{atm,down}}\) | Downwelling atmospheric infrared radiation absorbed by the surface |
| \(q_{\text{solar}}\) | Absorbed solar irradiance |
| \(h_c(T_a-T_s)\) | Conductive and convective heat leak from the surroundings, represented by an effective coefficient \(h_c\) |
| \(q_{\text{net}}\) | Net cooling power per unit area |

The outgoing radiative term depends on the surface’s wavelength- and angle-dependent emissivity:

\[
q_{\text{rad,out}}(T_s)
= \int_{\Omega}\int_0^\infty
\varepsilon_s(\lambda,\theta)
B_\lambda(T_s)\cos\theta\,d\lambda\,d\Omega,
\]

where \(\varepsilon_s(\lambda,\theta)\) is the surface emissivity, \(\theta\) is the emission angle, \(\Omega\) is the outward hemisphere, and \(B_\lambda(T_s)\) is Planck’s spectral radiance. The atmospheric term has a similar spectral structure, but includes the atmosphere’s wavelength- and angle-dependent emissivity. [2] [3]

The equation reveals why a headline temperature drop is not a material constant. If wind increases convection, if a mounting bracket conducts heat into the panel, or if humidity raises downwelling infrared radiation, the equilibrium temperature rises. A laboratory measurement under a clear, dry sky and strong thermal isolation cannot be transferred directly to every roof or vehicle.

## How materials control light and heat

The simplest conceptual design is a high-reflectance, high-emittance surface: reflect the Sun and emit strongly in the atmospheric window. Real materials achieve this through several approaches.

**Multilayer photonic stacks** use alternating dielectric films with different refractive indices. At carefully chosen thicknesses, reflected waves interfere constructively across much of the solar spectrum, while resonances in the thermal infrared enhance emission in selected bands. The first widely cited daytime demonstration used seven layers of hafnium dioxide and silicon dioxide above a reflective backing. Under direct sunlight, the structure combined high solar reflectance with strong emission in the atmospheric window. [1] [3]

**Porous polymers and particle-filled coatings** use scattering rather than only thin-film interference. Pores and embedded particles can be selected so that visible and near-infrared sunlight is strongly scattered back toward the sky. The polymer matrix can also provide high infrared transmission or emission, depending on its thickness, composition, and structure. This route is attractive for large-area films, textiles, and paint-like products because it can be more compatible with scalable manufacturing than nanofabricated stacks. [2] [3]

**Surface phonon polaritons** provide another mechanism. In polar dielectric materials, collective oscillations of the crystal lattice can couple to infrared photons, producing resonant emission at selected wavelengths. These resonances help designers place thermal emission inside the atmospheric window while minimizing unwanted absorption elsewhere. [3]

A second design choice concerns the width of the emission band. A **broadband emitter** radiates across much of the infrared. It can provide substantial heat rejection when the cooler is near or above ambient temperature. A **selective emitter** concentrates its emission in the atmospheric window, which is generally advantageous when the design goal is a temperature substantially below ambient because it avoids absorbing as much downwelling atmospheric radiation outside the window. [2] [3]

| Emitter type | Main advantage | Main trade-off |
|---|---|---|
| Broadband infrared emitter | Strong total thermal emission; useful near or above ambient | Can absorb more downwelling atmospheric radiation outside the window, limiting deep sub-ambient cooling |
| Selective atmospheric-window emitter | Better spectral matching for sub-ambient cooling | Requires more precise optical design and may provide less total emission in some operating regimes |
| Solar-reflective polymer or paint | Potentially scalable and easier to apply over large areas | Durability, dirt, colour, weathering, and simultaneous solar/infrared performance must be validated |
| Multilayer photonic structure | Fine control over angle and wavelength | Manufacturing complexity, cost, mechanical robustness, and scale-up can become limiting factors |

## What experiments have demonstrated

The decisive experimental milestone came in 2014, when Raman and collaborators demonstrated sub-ambient cooling under direct sunlight using a photonic radiative cooler. The seven-layer hafnium-dioxide/silicon-dioxide structure reflected **97% of incident sunlight**. On a rooftop under sunlight exceeding 850 W m⁻², it reached **4.9 °C below ambient air temperature** and delivered **40.1 W m⁻² of cooling power at ambient temperature**. [1]

These numbers describe two different performance metrics. The temperature difference tells us how far the surface moved below the surrounding air in that test configuration. Cooling power tells us how much heat the device can reject at a specified operating temperature. A cooler can have high cooling power near ambient but produce a smaller temperature drop when non-radiative heat leaks become dominant.

The technology has also moved beyond isolated solid samples. Goldstein, Raman, and Fan demonstrated fluid-cooling panels that used radiative sky cooling to cool water without evaporative losses. Over three days, the panels cooled water up to **5 °C below ambient** at a flow rate of 0.2 L min⁻¹ m⁻², with an effective heat-rejection flux of up to 70 W m⁻². Their model of a two-storey office building in hot, dry Las Vegas estimated a 21% reduction in summer cooling electricity, but that figure was a modelled result for a particular integration and climate—not a universal savings rate. [4]

A further practical obstacle is geometry. Many roofs face the sky, but building walls, vehicle sides, and other useful surfaces are vertical. A 2024 Science study demonstrated sub-ambient daytime cooling for a vertical surface using an angularly asymmetric, spectrally selective emitter. Under approximately 920 W m⁻² of peak sunlight, the emitter reached about 2.5 °C below ambient. The result matters because it addresses the view-factor and angular-emission problem that limits direct transfer of roof-panel designs to real façades and vehicles. [5]

## Where the technology can be used

Radiative cooling is most valuable where a moderate, continuous reduction in heat load is more important than producing refrigerator-like temperatures. It can be used alone for selected thermal-management tasks or paired with conventional equipment to reduce the work that compressors and chillers must do.

| Application | How radiative cooling helps | Engineering question |
|---|---|---|
| Building roofs and façades | Rejects heat directly to the sky and reduces envelope heat gain | Can the coating preserve reflectance and emittance after weathering and soiling? |
| Cooling-water loops | Provides non-evaporative heat rejection and can reduce condenser load | Is the available panel area sufficient for the required flow and heat load? |
| Solar photovoltaics | Lowers module temperature, which can improve operating conditions | Does the cooling layer preserve optical transmission and electrical reliability? |
| Electronics and sensors | Provides a passive heat sink for devices with intermittent or low heat loads | Can the device maintain a clear sky view without introducing conductive heat leaks? |
| Textiles and personal thermal management | Can transmit or radiate body heat while remaining visibly opaque or wearable | How do colour, breathability, washing, durability, and comfort affect performance? |
| Cold-chain and remote infrastructure | Offers a passive thermal buffer where electricity or water is scarce | How will the system handle cloudy periods and storage during low-cooling conditions? |

The most realistic near-term architecture is often **hybrid cooling**. A radiative panel can operate as a first-stage heat rejector, reducing the temperature or load presented to an active chiller. The active system remains available during cloudy, humid, or high-load conditions. This arrangement avoids treating radiative cooling as an all-or-nothing replacement and instead uses its passive capacity where the sky offers a useful heat sink.

## The limits engineers must design around

The phrase “cooling without power” is accurate only when applied to the radiative heat-rejection mechanism itself. A large installation may require pumps, fans, controls, insulation, actuators, cleaning, or a secondary chiller. The total system energy balance must include those components.

The atmosphere is another constraint. Radiative cooling works best with a large clear-sky view and low atmospheric infrared opacity. Humidity, clouds, aerosols, and haze make the sky a warmer radiative environment. A panel that performs impressively in a dry climate may deliver a smaller temperature drop in a humid coastal city. Climate-specific modelling and multi-season field tests are therefore essential.

Non-radiative heat transfer can be equally important. Wind-driven convection carries heat from the air into a cooler surface. Supports and heat-spreading layers can conduct heat from the roof or equipment into the panel. A transparent cover can suppress convection, but it also introduces its own reflection and infrared-absorption losses. The best optical spectrum is not enough; the mechanical and thermal package must preserve the intended energy balance.

Durability is a major commercialization question. Solar reflectance can decline when a surface becomes dirty, chalks, yellows, scratches, or accumulates biological growth. Infrared emissivity may change with oxidation, moisture, delamination, or polymer ageing. Large-area coatings must also be repairable, safe, compatible with existing substrates, and economically competitive with ordinary roofing or HVAC upgrades.

Finally, a passive cooler cannot reject unlimited heat. Its cooling power is bounded by its spectral emissivity, available sky view, atmospheric transmission, surface temperature, and parasitic heat leaks. When the required heat flux exceeds the radiative panel’s capacity, the system needs more area, better insulation, thermal storage, active assistance, or a combination of these.

## The broader significance

Passive radiative cooling turns **spectral engineering into thermal engineering**. Instead of adding more electrical machinery, it changes the wavelengths at which a surface interacts with the environment. That is a powerful design principle: the atmosphere is not merely an obstacle between a device and space; in the right spectral band, it is a transmission channel.

The most important advance is not any single coating or multilayer stack. It is the recognition that cooling can be designed as a problem of controlling photons across several bands at once: reject the Sun, emit through the atmospheric window, block downwelling radiation where possible, and suppress ordinary heat leaks. That framework links photonics, thermodynamics, materials science, architecture, and climate-responsive engineering.

### So what?

Passive radiative cooling will not eliminate the need for air conditioning, especially in cloudy climates or high-density buildings with large internal heat loads. Its practical value is more precise. It can reduce peak cooling demand, provide non-evaporative heat rejection, cool remote equipment without a grid connection, and create passive thermal-management pathways in places where electricity or water is constrained.

The technology’s future will be decided less by spectacular laboratory temperature drops than by field durability, installed cost, maintenance, climate-aware design, and integration with existing thermal systems. If those engineering hurdles are solved, the sky becomes more than scenery above a roof. It becomes a continuously available—though weather-dependent—heat sink.

## References

[1] A. P. Raman, M. A. Anoma, L. Zhu, E. Rephaeli, and S. Fan, “[Passive radiative cooling below ambient air temperature under direct sunlight](https://www.nature.com/articles/nature13883),” *Nature* 515, 540–544 (2014). DOI: [10.1038/nature13883](https://doi.org/10.1038/nature13883).

[2] J. Liang et al., “[Radiative cooling for passive thermal management towards sustainable carbon neutrality](https://pmc.ncbi.nlm.nih.gov/articles/PMC9843130/),” *National Science Review* 10, nwac208 (2023 collection). DOI: [10.1093/nsr/nwac208](https://doi.org/10.1093/nsr/nwac208).

[3] M. Lee et al., “[Photonic structures in radiative cooling](https://www.nature.com/articles/s41377-023-01119-0),” *Light: Science & Applications* 12, 134 (2023). DOI: [10.1038/s41377-023-01119-0](https://doi.org/10.1038/s41377-023-01119-0).

[4] E. A. Goldstein, A. P. Raman, and S. Fan, “[Sub-ambient non-evaporative fluid cooling with the sky](https://www.nature.com/articles/nenergy2017143),” *Nature Energy* 2, 17143 (2017). DOI: [10.1038/nenergy.2017.143](https://doi.org/10.1038/nenergy.2017.143).

[5] F. Xie et al., “[Subambient daytime radiative cooling of vertical surfaces](https://pubmed.ncbi.nlm.nih.gov/39541474/),” *Science* (2024). The PubMed record reports the study abstract and links the article record; the Science article DOI is [10.1126/science.adn2524](https://doi.org/10.1126/science.adn2524).

[1]: https://www.nature.com/articles/nature13883
[2]: https://pmc.ncbi.nlm.nih.gov/articles/PMC9843130/
[3]: https://www.nature.com/articles/s41377-023-01119-0
[4]: https://www.nature.com/articles/nenergy2017143
[5]: https://pubmed.ncbi.nlm.nih.gov/39541474/
