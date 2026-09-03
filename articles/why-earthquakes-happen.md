---
title: "Why Earthquakes Happen: Fault Stress, Friction, and Seismic Rupture"
slug: "why-earthquakes-happen"
author: "Vijayaramanan"
date: "2026-08-31"
category: "Applied Engineering & Physics"
tags: [earthquakes, seismology, plate tectonics, fault mechanics, geophysics]
readTime: "15 min read"
excerpt: "Earthquakes occur when accumulated tectonic stress overcomes friction on a fault and a rupture propagates through the crust. This guide explains the mechanics from plate motion and elastic rebound to seismic waves, magnitude, and hazard engineering."
---

# Why Earthquakes Happen: Fault Stress, Friction, and Seismic Rupture

An earthquake is not the ground "breaking" at one instant in one place. It is a **dynamic rupture**: a failure zone nucleates on a fault, accelerates when frictional resistance is overcome, and may propagate across kilometres of rock while radiating seismic waves. The visible shaking is the final stage of a mechanical process that can store strain for centuries and release it in seconds.

The central mechanism is well established. Tectonic plates move; faults can resist that motion through friction and other forms of fault strength; stress accumulates in the surrounding rock; and, when the stress state and frictional conditions permit unstable slip, part of the fault slips. The released elastic energy is redistributed into fault displacement, heating and rock deformation, seismic waves, and other forms of energy. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.") [2](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php "U.S. Geological Survey, Reid’s Elastic Rebound Theory.")

The difficult questions begin after that summary: Why does one locked patch rupture while another creeps? What controls rupture speed and direction? Why do some earthquakes remain small while others cascade across a plate boundary? And why can scientists estimate long-term hazard without reliably predicting the date of the next event?

This article develops the physics from first principles, distinguishes earthquake magnitude from local shaking intensity, and connects fault mechanics to the instruments and models used in engineering practice.

---

## Table of Contents

- [The short answer](#the-short-answer)
- [Earthquakes begin on faults](#earthquakes-begin-on-faults)
- [Plate motion loads the fault system](#plate-motion-loads-the-fault-system)
- [Elastic rebound: storing and releasing strain](#elastic-rebound-storing-and-releasing-strain)
- [The frictional failure condition](#the-frictional-failure-condition)
- [From nucleation to rupture](#from-nucleation-to-rupture)
- [The three basic fault geometries](#the-three-basic-fault-geometries)
- [How rupture becomes seismic waves](#how-rupture-becomes-seismic-waves)
- [Magnitude, moment, energy, and intensity](#magnitude-moment-energy-and-intensity)
- [Why aftershocks happen](#why-aftershocks-happen)
- [Human-triggered earthquakes](#human-triggered-earthquakes)
- [How scientists locate and measure earthquakes](#how-scientists-locate-and-measure-earthquakes)
- [Why prediction remains out of reach](#why-prediction-remains-out-of-reach)
- [So what? Engineering and hazard reduction](#so-what-engineering-and-hazard-reduction)
- [Conclusion](#conclusion)
- [References](#references)

---

## The short answer

Earthquakes happen when two blocks of Earth suddenly slip past one another along a fault. Most are associated with tectonic plate boundaries, where plate motion continually loads networks of faults. The fault surfaces are rough and may be locked by friction while the surrounding crust deforms elastically. When the stress state and frictional conditions allow slip to become unstable, rupture can begin. If the slipping region makes neighbouring portions of the fault fail, the rupture propagates and produces an earthquake. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.") [2](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php "U.S. Geological Survey, Reid’s Elastic Rebound Theory.")

The energy released is not primarily energy created at the instant of failure. It is energy accumulated gradually as the rocks deform and the tectonic system is driven. The earthquake converts part of that stored elastic energy into permanent fault displacement, heat and frictional damage, seismic waves, and smaller deformations in the surrounding crust.

## Earthquakes begin on faults

A **fault** is a fracture or fracture zone across which rocks have moved relative to one another. Faults range from small structures that are difficult to see to plate-boundary systems extending hundreds of kilometres. The fault plane is the geometric surface used to describe the slip, although real earthquake ruptures often involve rough, branching, segmented, and interconnected surfaces rather than a perfectly flat plane. [2](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php "U.S. Geological Survey, Reid’s Elastic Rebound Theory.") [3](https://www.iris.edu/hq/inclass/sequences/faults_plate_tectonics_and_earthquake_hazards "NSF SAGE / IRIS, Faults, Plate Tectonics, and Earthquake Hazards.")

An earthquake rupture begins below the surface at the **hypocentre**, also called the focus. The point on the surface directly above it is the **epicentre**. These terms describe different locations: the epicentre is a map reference, while the hypocentre is the point where rupture initiates in the subsurface. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.")

Faults are not uniformly weak or uniformly strong. Their strength depends on rock type, surface roughness, normal compression, pore-fluid pressure, temperature, chemical alteration, and the history of previous slip. A fault may contain locked asperities that resist motion beside regions that creep slowly. This spatial heterogeneity is one reason earthquake rupture is difficult to forecast from plate velocity alone.

## Plate motion loads the fault system

The lithosphere—the relatively cool, rigid outer shell of Earth—is divided into tectonic plates. Plate motion results from the coupled dynamics of the lithosphere and mantle, with forces associated with subducting slabs, mid-ocean ridges, mantle flow, and gravitational effects contributing to the overall plate-driving system. At their boundaries, plates diverge, converge, or slide laterally past one another. These motions impose stresses on faults. [3](https://www.iris.edu/hq/inclass/sequences/faults_plate_tectonics_and_earthquake_hazards "NSF SAGE / IRIS, Faults, Plate Tectonics, and Earthquake Hazards.")

At a transform boundary, two blocks tend to move horizontally in opposite directions. At a convergent boundary, one plate may subduct beneath another, producing compression and often very large thrust earthquakes. At a divergent boundary, extension creates normal faulting as the crust is pulled apart. The idealized boundary type predicts a dominant style of motion, but local geology can introduce oblique slip, secondary faults, and complex rupture paths.

The loading is usually slow compared with rupture. A plate may move centimetres per year, while the main phase of a large earthquake lasts seconds to minutes. This separation of timescales is central to the earthquake cycle: a fault system is driven gradually toward failure, then responds rapidly when its frictional state and stress field permit unstable slip.

Plate boundaries host most earthquakes, but not all earthquakes occur directly at a boundary. Intraplate earthquakes can happen when ancient faults are reactivated by regional stresses, changes in loading, or local weaknesses. The absence of a nearby visible plate boundary does not imply the absence of stored tectonic stress.

## Elastic rebound: storing and releasing strain

The clearest physical picture of the earthquake cycle is **elastic rebound**. In the early twentieth century, Henry Fielding Reid used observations of ground displacement associated with the 1906 San Francisco earthquake to infer that the crust had accumulated elastic strain and then rebounded when the fault slipped. [2](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php "U.S. Geological Survey, Reid’s Elastic Rebound Theory.")

Imagine a fence crossing a locked strike-slip fault. As one side of the fault moves relative to the other, the fence bends. The fence and nearby ground are not rigidly transported as a single block; they deform. When the fault finally slips, the stored distortion is partly released, leaving the fence displaced but less bent. The real deformation is distributed over a broad region and is measured with geodetic instruments such as high-precision GPS rather than observed as a cartoon-like bend. [2](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php "U.S. Geological Survey, Reid’s Elastic Rebound Theory.")

The analogy is useful but incomplete. Rocks are not ideal springs, and the crust is heterogeneous, three-dimensional, and subject to temperature, pressure, fluids, and permanent damage. Elastic rebound describes the release of stored strain energy; it does not by itself specify the friction law, rupture speed, fault geometry, or final slip distribution.

A useful one-dimensional approximation is Hooke's law:

$$
\sigma = E \varepsilon
$$

where $\sigma$ is stress, $\varepsilon$ is strain, and $E$ is Young's modulus. This equation is only a local linear-elastic model. In a real fault system, the stress state is a tensor, the material response can be nonlinear, and the relevant failure is governed by shear and normal components on a particular plane. Nevertheless, the equation captures the essential storage mechanism: slow deformation can create recoverable elastic energy before rapid failure.

The elastic energy density in the same idealized setting is:

$$
w = \frac{1}{2}\sigma \varepsilon = \frac{\sigma^2}{2E}
$$

provided the material remains linear elastic. During an earthquake, only part of the available energy becomes radiated seismic energy. The rest is consumed by frictional heating, crushing and permanently deforming rock, and changing stresses around the rupture. [5](https://doi.org/10.17226/10493 "National Research Council, Living on an Active Earth: Perspectives on Earthquake Science (2003).")

## The frictional failure condition

The simplest failure criterion compares shear traction on the fault with frictional resistance. Let $\tau$ be shear stress and $\sigma_n$ be compressive normal stress. A Coulomb-style approximation writes the frictional resistance as:

$$
\tau_{\mathrm{resist}} = c + \mu(\sigma_n - p)
$$

where $c$ is cohesion, $\mu$ is an effective coefficient of friction, and $p$ is pore-fluid pressure. Slip becomes mechanically possible when:

$$
\tau > c + \mu(\sigma_n - p)
$$

This equation is a simplified Coulomb-style model, not a universal law of every earthquake. It assumes that the relevant resistance can be represented by a friction coefficient and an effective normal stress. Real fault friction can depend on sliding rate, state, temperature, fluids, rock composition, and slip history. The equation nevertheless shows why fluids matter: increasing pore pressure reduces effective normal stress and can bring a fault closer to failure without requiring a proportional increase in tectonic shear stress.

The equation also explains why orientation matters. The same three-dimensional stress tensor produces different normal and shear tractions on differently oriented planes. A fault can be optimally oriented for failure in one region and mechanically quiet in another even under broadly similar regional loading.

Real earthquake friction is rate- and state-dependent. Laboratory experiments and field observations motivate constitutive laws in which friction changes with sliding velocity, contact maturity, temperature, gouge composition, and slip history. Some conditions promote stable sliding or creep; others permit dynamic weakening and runaway rupture. The physics of a large earthquake therefore depends on both the initial stress state and how the frictional resistance evolves during slip.

## From nucleation to rupture

An earthquake does not necessarily begin as an instantaneous failure of the entire fault. A small patch may undergo accelerating slip, forming a **nucleation zone**. If the local stress, frictional properties, and elastic interactions make the slip unstable, the rupture front can expand into neighbouring parts of the fault. [5](https://doi.org/10.17226/10493 "National Research Council, Living on an Active Earth: Perspectives on Earthquake Science (2003).")

Three processes then interact:

1. **Elastic loading** from the surrounding rock, which supplies stress to the slipping region.
2. **Frictional evolution**, which may reduce resistance as slip accelerates.
3. **Wave-mediated interaction**, because the rupture emits elastic waves that alter stress ahead of and behind the front.

The rupture can accelerate, slow, branch, or stop depending on the evolving stress field, fault geometry, frictional behaviour, and material properties along the rupture path.

A fault is therefore not a fuse with a single predetermined ignition point. Its rupture path depends on geometry, stress heterogeneity, friction, fluids, material contrasts, and the timing of nearby failures. Numerical rupture models represent these effects with constitutive laws and boundary conditions, but their outputs remain model-dependent because the stress and frictional state at seismogenic depth cannot be directly observed.

This is also why "earthquake size" is not identical to "how violently one location shakes." A rupture can be large but relatively distant from a site, or moderate but shallow and directly beneath soft sediment. The source process and the wave-propagation path must both be considered.

## The three basic fault geometries

Fault names describe the relative motion of the blocks around the fault plane. The three basic idealizations are summarized below:

| Fault type | Dominant stress regime | Relative motion | Typical tectonic setting |
|---|---|---|---|
| **Normal fault** | Extension | Hanging wall moves down relative to footwall | Rifts and regions undergoing crustal stretching |
| **Reverse or thrust fault** | Compression | Hanging wall moves up relative to footwall | Convergent margins and mountain-building regions |
| **Strike-slip fault** | Shear | Blocks move laterally past one another | Transform boundaries and major continental shear zones |

The terms "normal" and "reverse" refer to motion perpendicular to the fault plane, while "strike-slip" describes motion parallel to the strike of the fault. Natural earthquakes can combine these modes in **oblique-slip** ruptures. Fault geometry influences the radiation pattern of seismic waves, surface deformation, stress transfer, and the likelihood that rupture will jump between connected segments.

## How rupture becomes seismic waves

When a fault slips rapidly, the surrounding rock cannot adjust everywhere at once. The sudden displacement launches elastic disturbances that propagate through the crust and mantle. These are seismic waves.

- **P waves** (primary waves): Compressional waves where particle motion is parallel to the direction of propagation. They travel fastest and are the first body waves detected by a seismograph station.
- **S waves** (secondary waves): Shear waves where particle motion is perpendicular to the direction of travel. They travel slower than P waves and arrive later.
- **Surface waves**: Travel along Earth's surface (Rayleigh and Love waves) and often produce the strongest ground displacements and longest durations of shaking in the built environment. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.")

A seismometer records ground motion as a function of time. The instrument's inertial mass responds differently from its moving frame, allowing the relative motion to be measured. The resulting seismogram contains information about the source, propagation path, and local site response. Separating these effects is a central task in observational seismology.

The waves are not merely a signal announcing that the fault slipped. They carry information about rupture direction, slip timing, fault orientation, material interfaces, and the energy radiated at different frequencies. Modern finite-fault inversions use many waveforms to estimate how slip varied across the rupture surface rather than reducing the event to one number.

## Magnitude, moment, energy, and intensity

Several earthquake measurements are routinely confused. **Magnitude** describes the size of the earthquake source and is intended to be one value for the event. **Intensity** describes the shaking at a particular location, so one earthquake produces many intensity values across a region. [6](https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity "U.S. Geological Survey, Earthquake Magnitude, Energy Release, and Shaking Intensity.")

For large earthquakes, moment magnitude ($M_w$) is based on seismic moment. The scalar seismic moment is approximated by:

$$
M_0 = \mu A \bar{D}
$$

where $\mu$ is the fault-zone rigidity, $A$ is the rupture area, and $\bar{D}$ is average slip. A larger rupture, greater slip, or stiffer surrounding rock generally produces a larger seismic moment. [6](https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity "U.S. Geological Survey, Earthquake Magnitude, Energy Release, and Shaking Intensity.")

Using SI units for $M_0$ in newton-metres ($\text{N}\cdot\text{m}$), the standard conversion is:

$$
M_w = \frac{2}{3} \left( \log_{10} M_0 - 9.1 \right)
$$

The constant depends on the unit convention; the equation above is the metric form presented by the U.S. Geological Survey. Because the scale is logarithmic, a one-unit increase in magnitude corresponds to a tenfold increase in measured waveform amplitude and roughly 32 times more energy release, although radiated energy and seismic moment are not identical quantities. [6](https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity "U.S. Geological Survey, Earthquake Magnitude, Energy Release, and Shaking Intensity.")

Intensity depends on distance from the rupture, depth, rupture direction, local geology, and the frequency content of the waves. Soft sediments can amplify shaking relative to nearby bedrock. Two earthquakes with similar magnitudes can therefore produce very different damage patterns.

The engineering consequence is direct: a hazard assessment cannot use magnitude alone. It must consider the distribution of possible rupture sources, wave attenuation, site amplification, basin effects, building characteristics, and the duration and frequency content of shaking.

## Why aftershocks happen

The mainshock changes the stress field around the ruptured fault. Some neighbouring patches are unloaded, while others receive increased stress. The altered field can trigger additional failures, producing aftershocks. The sequence is not simply the same earthquake repeating at smaller scale; it is a coupled response of a heterogeneous fault system to a sudden redistribution of stress. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.") [5](https://doi.org/10.17226/10493 "National Research Council, Living on an Active Earth: Perspectives on Earthquake Science (2003).")

Aftershocks can continue for weeks, months, or years depending on the mainshock and the surrounding fault network. Their locations and timing provide information about the ruptured volume, fault geometry, and stress transfer. They also create an important operational problem: structures weakened by the mainshock may face additional shaking while emergency response and inspection are still underway.

## Human-triggered earthquakes

Not every earthquake is driven solely by long-term plate motion. Human activities can alter stresses and pore pressures sufficiently to trigger earthquakes in some settings. Fluid injection and withdrawal, reservoir impoundment, mining, geothermal operations, and underground energy production can change the effective stress on pre-existing faults.

The relevant mechanism is consistent with the effective-stress picture used to explain induced earthquakes. [10](https://www.usgs.gov/faqs/how-does-injection-fluid-depth-cause-earthquakes "U.S. Geological Survey, How does the injection of fluid at depth cause earthquakes?") If pore pressure $p$ rises, effective normal stress $\sigma_n - p$ falls. A fault that was close to failure may then slip. Triggering does not mean that human activity creates tectonic stress from nothing; it means that an external perturbation can advance the failure of a fault already loaded by the regional stress field.

The size and likelihood of induced events depend on injection volume and pressure, permeability, fault connectivity, stress orientation, depth, and the mechanical properties of the reservoir and surrounding rocks. A causal claim must therefore be based on a physical and statistical assessment of timing, location, pressure diffusion, and background seismicity—not merely on temporal coincidence.

## How scientists locate and measure earthquakes

The first practical task is locating the source. P waves arrive before S waves because they travel faster. The difference between their arrival times at a station provides information about the distance from that station to the earthquake. A single station does not uniquely determine the source location. Multiple stations are combined with seismic-wave travel-time information and Earth models to estimate the earthquake's origin time, latitude, longitude, and depth. The familiar "triangulation" picture is a useful teaching model, while operational earthquake-location systems use velocity models and numerical inversion. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.")

The depth and origin time are estimated simultaneously with the horizontal location. Errors arise from uncertain crustal velocities, station geometry, timing, local geology, and complex waveforms. A well-distributed network improves the solution, but even dense networks do not directly observe the fault's complete stress state before rupture.

Magnitude estimation begins with seismograms. Different magnitude types emphasize different wave periods, distances, and source properties. For larger events, moment-based methods and finite-fault modelling are preferred because simple amplitude scales can saturate or become less reliable. USGS finite-fault models use seismic and geodetic observations to estimate where, when, and how much slip occurred across the ruptured fault surface. Kinematic models can also estimate how seismic moment was released through time. [8](https://earthquake.usgs.gov/data/finitefault/ "U.S. Geological Survey, Finite Faults.")

Geodesy adds a complementary measurement. GPS stations, satellite radar (InSAR), and other instruments can detect slow interseismic deformation, coseismic offsets, and postseismic relaxation. A seismometer captures rapid ground motion; geodesy measures the geometry of deformation before, during, and after the earthquake. Together they constrain the earthquake cycle across many timescales.

## Why prediction remains out of reach

Scientists can identify active faults, estimate recurrence over long time windows, model likely shaking, and issue alerts after rupture begins. That is different from deterministic prediction, which would specify the exact time, location, and magnitude of a future earthquake.

The difficulty is not a lack of effort or a single missing sensor. The fault system is hidden beneath the surface, its stress tensor and frictional state are not directly measurable at seismogenic depth, and its dynamics are nonlinear and heterogeneous. The National Academies describes earthquake physics as a system-level problem involving fault geometry, nonlinear rock response, rupture dynamics, wave propagation, and hazard analysis. [5](https://doi.org/10.17226/10493 "National Research Council, Living on an Active Earth: Perspectives on Earthquake Science (2003).")

A precursor would need to be both physically causal and reliably distinguishable from ordinary fluctuations in a fault system. Proposed signals such as unusual animal behaviour or "earthquake weather" have not produced a dependable prediction method, and the USGS states that earthquakes cannot currently be predicted in the deterministic sense. [1](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes "U.S. Geological Survey, The Science of Earthquakes.")

This limitation does not make science powerless. Probabilistic seismic-hazard analysis replaces an impossible promise of exact timing with quantified estimates of shaking likelihood over a region and time interval. Earthquake early-warning systems take a different approach: they detect an earthquake after rupture begins, rapidly characterize the event, and can provide warning before stronger shaking reaches more distant locations. The amount of warning depends strongly on the distance between the source, seismic stations, and the receiving site. [9](https://www.usgs.gov/programs/earthquake-hazards/science/earthquake-early-warning-around-world "U.S. Geological Survey, Earthquake Early Warning Around the World.") Neither method prevents rupture, but both can reduce risk.

## So what? Engineering and hazard reduction

Earthquake engineering begins with the source but cannot stop there. A useful design process follows the chain from tectonic loading to building response:

| Physical layer | Engineering question |
|---|---|
| **Fault system** | Which faults can rupture, and what magnitudes and slip distributions are plausible? |
| **Rupture dynamics** | How fast, how long, and in what direction might rupture propagate? |
| **Wave propagation** | How will waves attenuate, reflect, or amplify through the crust and sedimentary basins? |
| **Site response** | What frequencies and durations will the local soil or rock amplify? |
| **Structural response** | How will the building, bridge, pipeline, or system respond to those demands? |
| **Recovery and resilience** | What redundancy, monitoring, inspection, and operational plans limit cascading losses? |

The "So What?" is therefore not simply that earthquakes are dangerous. It is that earthquake risk is an engineering problem in **uncertainty management**. Fault models are incomplete, site conditions vary, and rare events are difficult to sample statistically. Designs must remain safe across plausible ranges of ground motion rather than rely on a single predicted waveform.

Seismology also informs infrastructure monitoring. Dense sensor networks can estimate shaking in near real time. Structural health-monitoring systems can compare measured acceleration and drift with design thresholds. Geodetic networks reveal strain accumulation and post-event deformation. Public alert systems can automatically pause trains, open firehouse doors, stop industrial processes, and protect data systems when warning time permits.

Preparedness remains important because no model removes uncertainty. Retrofitting vulnerable structures, securing nonstructural components, designing lifelines with redundancy, and practicing response procedures often reduce risk more reliably than attempting to identify a precise future rupture date.

## Conclusion

Earthquakes happen because Earth's slowly moving tectonic system loads faults that are rough, heterogeneous, and frictionally constrained. Elastic strain accumulates while a fault is locked. When the stress state and frictional conditions permit unstable slip, a rupture nucleates. If it propagates, it converts stored energy into permanent displacement, heat, rock damage, and seismic waves.

The equations are compact, but the real system is not. Coulomb-style failure explains the roles of shear stress, normal stress, cohesion, friction, and pore pressure. Elastic rebound explains how strain can be stored and released. Seismic moment links earthquake size to rigidity, rupture area, and slip. Waveforms and geodesy reveal different parts of the earthquake cycle. Numerical models connect these observations, but they cannot directly measure the hidden stress and frictional state at depth.

That is why modern earthquake science does not promise exact prediction. It builds physically informed probabilities, rapid detection, improved rupture models, and more resilient infrastructure. The most valuable result is not a false certainty about when the ground will move. It is a better quantitative understanding of what can happen—and a design culture prepared for it.

## Suggested tags

`earthquakes` · `seismology` · `plate tectonics` · `fault mechanics` · `geophysics`

## References

1. [U.S. Geological Survey, The Science of Earthquakes](https://www.usgs.gov/programs/earthquake-hazards/science-earthquakes)
2. [U.S. Geological Survey, Reid’s Elastic Rebound Theory](https://earthquake.usgs.gov/earthquakes/events/1906calif/18april/reid.php)
3. [NSF SAGE / IRIS, Faults, Plate Tectonics, and Earthquake Hazards](https://www.iris.edu/hq/inclass/sequences/faults_plate_tectonics_and_earthquake_hazards)
4. [National Research Council, Living on an Active Earth: Perspectives on Earthquake Science (2003)](https://doi.org/10.17226/10493)
5. [U.S. Geological Survey, Earthquake Magnitude, Energy Release, and Shaking Intensity](https://www.usgs.gov/programs/earthquake-hazards/earthquake-magnitude-energy-release-and-shaking-intensity)
6. [U.S. Geological Survey, Magnitude Types](https://www.usgs.gov/programs/earthquake-hazards/magnitude-types)
7. [U.S. Geological Survey, Finite Faults](https://earthquake.usgs.gov/data/finitefault/)
8. [U.S. Geological Survey, Earthquake Early Warning Around the World](https://www.usgs.gov/programs/earthquake-hazards/science/earthquake-early-warning-around-world)
9. [U.S. Geological Survey, How does the injection of fluid at depth cause earthquakes?](https://www.usgs.gov/faqs/how-does-injection-fluid-depth-cause-earthquakes)
