---
title: "How to Build a Low-Cost Earthquake Monitor with Raspberry Shake"
slug: "how-to-build-low-cost-earthquake-monitor-raspberry-shake"
author: "Vijayaramanan"
date: "2026-09-17"
category: "Tutorial"
tags: [earthquake monitor, Raspberry Shake, seismology, seismograph, seismic waves]
readTime: "12 min read"
excerpt: "Set up a Raspberry Shake as a personal earthquake monitor, stream live seismic waveforms, establish a quiet baseline, and interpret events responsibly."
description: "Learn how to build a low-cost earthquake monitor with Raspberry Shake, configure live waveform streaming, reduce noise, and interpret seismic events safely."
---

# How to Build a Low-Cost Earthquake Monitor with Raspberry Shake


A useful earthquake monitor does not need to begin with a national observatory. A compact Raspberry Shake can turn a Raspberry Pi-based sensor into a personal seismograph that records ground motion, displays live waveforms, and contributes data to a shared network when configured for forwarding. This tutorial explains **how to build a low-cost earthquake monitor with Raspberry Shake**, from physical placement and first network connection to baseline measurements, event verification, and responsible interpretation.

You will build a continuously running station rather than a one-time vibration detector. The finished system will have a stable physical installation, a documented station location, live waveform access, a quiet-time baseline, and a repeatable method for distinguishing likely seismic signals from footsteps, doors, traffic, HVAC systems, and loose hardware. The workflow is aimed at students, citizen scientists, educators, engineers, and technically curious readers; it is not a substitute for a calibrated research seismometer or an official earthquake warning system.

The approach is useful because a seismometer measures the relative motion between a ground-coupled support and an inertial mass. USGS describes this differential motion as the fundamental operating principle of seismometers, and explains that permanent recordings are made by seismographs. [1] A personal station cannot locate an earthquake reliably by itself, but it can teach you how ground motion becomes a waveform and how multiple stations use arrival-time differences to constrain an event.

> A home seismograph is an observational instrument, not a life-safety device. Do not use a Raspberry Shake, its network status, or an online waveform to decide whether it is safe to enter a building or remain in an area during an earthquake. Follow local emergency-management instructions.

## Table of Contents

- [What you are building](#what-you-are-building)
- [Prerequisites and requirements](#prerequisites-and-requirements)
- [Step 1: Choose the station model and installation site](#step-1-choose-the-station-model-and-installation-site)
- [Step 2: Mount the sensor for a stable ground connection](#step-2-mount-the-sensor-for-a-stable-ground-connection)
- [Step 3: Connect the station to your network](#step-3-connect-the-station-to-your-network)
- [Step 4: Open the local interface and complete first-time setup](#step-4-open-the-local-interface-and-complete-first-time-setup)
- [Step 5: Secure the station before exposing it to a network](#step-5-secure-the-station-before-exposing-it-to-a-network)
- [Step 6: Establish a quiet baseline](#step-6-establish-a-quiet-baseline)
- [Step 7: Verify the waveform without damaging the instrument](#step-7-verify-the-waveform-without-damaging-the-instrument)
- [Step 8: View live data and compare with regional stations](#step-8-view-live-data-and-compare-with-regional-stations)
- [Step 9: Interpret P and S arrivals cautiously](#step-9-interpret-p-and-s-arrivals-cautiously)
- [Step 10: Document, maintain, and improve the station](#step-10-document-maintain-and-improve-the-station)
- [Expected output](#expected-output)
- [Troubleshooting and common pitfalls](#troubleshooting-and-common-pitfalls)
- [Pro tips and best practices](#pro-tips-and-best-practices)
- [Summary and next steps](#summary-and-next-steps)
- [References](#references)

## What you are building

The station consists of a Raspberry Shake sensor board and its Raspberry Pi computer, a power supply, a network connection, and a mechanically stable installation. The sensor detects ground motion and the onboard computer packages the signal for local viewing and optional network forwarding.

The measurement chain is conceptually:

```text
ground motion → sensor mechanics → Raspberry Shake electronics
              → onboard processing → local waveform interface
              → optional network forwarding → StationView / analysis software
```

The station is best understood as a **personal seismograph**. It can reveal local cultural noise and larger regional or global seismic events, but the useful detection range depends on the model, installation, local geology, building noise, sensor orientation, network timing, and event size. Do not infer a universal magnitude threshold from a single home installation.

A strong station has three properties:

| Property | Meaning |
|---|---|
| Mechanical stability | The sensor is coupled to the ground or a massive, stable structure rather than a vibrating shelf. |
| Metadata quality | Location, orientation, model, time, and installation conditions are recorded accurately. |
| Comparative context | A candidate event is compared with other stations or authoritative earthquake catalogs rather than judged from one trace alone. |

## Prerequisites and requirements

| Requirement | Practical choice | Why it matters |
|---|---|---|
| Sensor station | Raspberry Shake RS1D or another currently supported Raspberry Shake model | Provides a purpose-built personal seismic instrument. Check the current official specifications before purchase. [2] |
| Power | Manufacturer-approved power supply | Prevents brownouts and unstable operation. |
| Network | Ethernet cable to a router, modem, switch, or wall Ethernet jack | The official Quick Start Guide recommends Ethernet for initial configuration. [3] |
| Computer | Laptop, desktop, tablet, or phone with a modern browser | Used to configure and inspect the station. |
| Installation site | Basement slab, ground-level masonry, or another heavy stable structure | Reduces motion caused by furniture, footsteps, and building resonance. |
| Visualization | Local web interface and optional Swarm software | Shows live waveforms and supports inspection of events. [3] |
| Documentation | Station log, camera or phone, and a text file or notebook | Preserves setup details and makes later comparisons meaningful. |
| Knowledge | Basic networking, waveform reading, and safety procedures | No advanced programming is required. |

The exact connectors, supported models, operating-system behavior, and visualization tools can change. Use the official [Raspberry Shake Manual](https://manual.raspberryshake.org/) for the model and software version you own; do not substitute instructions from a different hardware revision without checking compatibility.

## Step 1: Choose the station model and installation site

Select a model based on the question you want to answer. A one-axis vertical instrument is suitable for learning how local ground motion appears in a waveform. A multi-axis model provides more directional information but does not automatically make the station a professional broadband observatory.

Choose the installation site before assembling the station. A basement floor or ground-level concrete slab is usually preferable to an upper-floor shelf because the structure transmits less amplified human activity and building sway. Avoid locations next to washing machines, boilers, pumps, loudspeakers, elevators, garage doors, HVAC equipment, and frequently used stairways.

Keep the sensor away from direct sunlight, large temperature swings, water, condensation, and accidental contact. Do not bury or seal electronics in a way that prevents heat dissipation or service access. If the building has a known structural problem, do not enter restricted areas to install a sensor; personal safety takes priority over data collection.

Before mounting, record:

| Field | Example |
|---|---|
| Model and serial number | Exact label from the device |
| Room and floor | Basement utility room, north wall |
| Surface | Concrete slab, masonry ledge, or other support |
| Orientation | Sensor arrow or reference direction, if applicable |
| Installation date | Local date and time with time zone |
| Nearby noise sources | HVAC, road traffic, pump, refrigerator |
| Network connection | Ethernet to router, local address after setup |

## Step 2: Mount the sensor for a stable ground connection

Follow the official assembly and installation instructions for your model. The goal is a firm, repeatable mechanical connection—not an elaborate enclosure. Place the sensor on a massive, stable support and prevent it from sliding, rocking, or touching loose objects.

A practical installation sequence is:

1. Clear dust, moisture, cables, and loose objects from the mounting area.
2. Place the sensor in the chosen orientation and verify that it is stable.
3. Use only the mounting hardware and attachment method appropriate for the model and surface.
4. Route cables so that they cannot pull on the station or vibrate against the enclosure.
5. Photograph the installed arrangement and note anything that may change later.
6. Allow the station to remain undisturbed while you establish a baseline.

Do not mount the station to a lightweight table merely because the table is convenient. A table can act as a vibration amplifier, turning footsteps and keyboard movement into signals that resemble local seismic activity. Conversely, a completely isolated soft support can attenuate ground motion. The installation should be stable and documented, not necessarily perfect.

## Step 3: Connect the station to your network

The Raspberry Shake Quick Start Guide instructs users to connect the unit by Ethernet to a router, modem, switch, or wall Ethernet jack rather than directly to a computer. [3] Connect the network cable first, then connect the approved power supply and power on the unit.

The first startup may require an Internet connection so the software can update. The duration depends on the connection and the update state. Do not interrupt power during a software update unless the official manual specifically directs you to do so.

Use this order:

```text
1. Sensor mounted and cables secured
2. Ethernet connected to the local network
3. Approved power connected
4. Status LEDs observed
5. Browser opened on another device
```

If you are installing the station on a managed or restricted network, check whether device discovery, multicast DNS, outbound connections, or firewall rules are limited. A station can be powered and functioning while remaining inaccessible through its local hostname.

## Step 4: Open the local interface and complete first-time setup

From a device on the same local network, open:

```text
http://rs.local/
```

The official guide notes that `rs.local/` replaced the older `raspberryshake.local` address. If the hostname does not resolve, locate the station’s IP address in the router’s client list or use the discovery method described by the official documentation. [3]

Open the settings area and complete the station configuration. Enter the location carefully. The latitude and longitude should identify the installation site, not the city center or an approximate neighborhood. Accurate station metadata matters when comparing arrival times or viewing the station in a distributed network.

Configure the following items and record the values:

| Setting | Action |
|---|---|
| Station name | Use a stable, non-identifying label if the data may be shared publicly. |
| Location | Enter the station’s actual location according to the platform’s privacy policy. |
| Orientation | Record the sensor orientation and any model-specific directional setting. |
| Time and network | Confirm the station can maintain correct time through its network configuration. |
| Data forwarding | Enable only after reviewing what will be shared and how location is displayed. |
| Update behavior | Allow the official software update process to complete before judging stability. |

After saving, allow the station to restart if requested. The Quick Start Guide directs users to StationView after configuring data forwarding and location, and recommends Swarm for viewing live data on a computer. [3]

## Step 5: Secure the station before exposing it to a network

The official Quick Start Guide identifies a default password during first-time setup and includes a dedicated instruction to secure the station afterward. Change default credentials immediately and store the new password in an approved password manager or laboratory credential system. [3]

Do not expose the station’s administration interface directly to the public Internet. Prefer a network architecture in which the station can make the outbound connections it needs while administrative access remains limited to the local network or an approved VPN. If the station is installed in a school, laboratory, or shared office, coordinate with the network administrator rather than forwarding arbitrary ports.

Use a separate network segment or guest/IoT VLAN when appropriate, but verify that the station can still complete its update and data-forwarding workflows. Network isolation is useful only when it is tested. Record the local IP address or reservation method so that future maintenance does not require guessing.

## Step 6: Establish a quiet baseline

Before looking for earthquakes, measure what “normal” looks like at your site. Let the station run without deliberate disturbance for a known interval, such as overnight or through several periods of ordinary activity. The precise interval is a practical choice; the important point is to sample more than one operating condition.

Record the baseline in a table:

| Time window | Observed waveform | Likely local sources | Confidence |
|---|---|---|---|
| Overnight | Quiet, occasional transients | HVAC cycle, distant traffic | Medium |
| Morning | Repeated short bursts | Footsteps, doors, plumbing | High |
| Work hours | Continuous elevated noise | People, machinery, traffic | Medium |
| Weekend | Different noise pattern | Occupancy and road changes | Medium |

Look for repeated signatures. A vibration that occurs at the same time every day and has a similar shape is more likely to be cultural noise than a tectonic event. This is not a proof; it is a baseline hypothesis that should be tested against other stations and catalogs.

Keep the installation unchanged while collecting the first baseline. Moving the sensor, changing the mounting surface, or rerouting cables can alter the waveform independently of any earthquake.

## Step 7: Verify the waveform without damaging the instrument

Perform only a gentle, non-destructive signal check after the station is configured. A light, controlled footstep on the same stable structure, or another method explicitly permitted by the equipment instructions, can confirm that the displayed trace responds to local motion. Keep the test away from the sensor if the mounting surface is delicate, and do not strike the enclosure, floor, or sensor.

The purpose is to verify the data path—not to estimate sensitivity, magnitude, or detection threshold. Save the approximate time of the test and label it in your station log so that you do not later mistake it for a natural event.

Never use a hammer, heavy impact, dropping object, strong vibration motor, or electrical actuator as a “calibration” source unless you have a controlled laboratory procedure and know the mechanical limits of the instrument. A personal seismograph is not improved by being shocked.

## Step 8: View live data and compare with regional stations

Use the local interface to confirm that the waveform is updating. For a richer desktop view, install the current Swarm software through the official Raspberry Shake workflow. The Quick Start Guide describes Swarm as a desktop application for displaying live data and interacting with the waveform stream. [3]

If you have enabled data forwarding, use StationView or the platform’s current network tools to compare your trace with stations in the region. Look for a signal that appears at multiple stations with physically plausible timing. A disturbance visible only at your station is more likely to be local cultural noise, although a very local earthquake can also be detected by a small subset of nearby stations.

Comparison does not require identical waveform amplitudes. Stations can have different sensor models, orientations, site conditions, gains, filters, and noise floors. Focus first on timing and broad waveform structure, then on amplitude only when the instruments and processing are comparable.

USGS explains that seismic waves lose energy with distance but sensitive detectors can record waves from small earthquakes. [1] That fact supports the use of a local monitor for observation, but it does not turn one home station into a complete regional network.

## Step 9: Interpret P and S arrivals cautiously

An earthquake can generate multiple seismic phases. USGS identifies the P wave as the primary wave and the S wave as the secondary wave; P generally arrives first at a station. [1] The time between P and S arrivals can provide an estimate of distance when the waveform is clear and an appropriate travel-time relationship is used.

For an educational exercise:

1. Identify a candidate event in your waveform.
2. Record the timestamp of the first plausible P-wave arrival.
3. Record the timestamp of the first plausible S-wave arrival.
4. Compute the `S–P` time interval.
5. Compare the event time and approximate interval with a regional station or official catalog.
6. Mark uncertainty caused by sampling interval, filtering, noise, and ambiguous phase picks.

Do not convert an `S–P` interval directly into an exact distance with an invented universal velocity. Wave speeds vary with geological structure and the phase path. Official network analysts use calibrated instruments, travel-time models, station metadata, and multiple observations.

A single station also cannot reliably locate an epicenter. USGS describes the multi-station principle: distances inferred from P–S arrival intervals can be combined across stations to constrain a common intersection. [1] Your monitor can contribute an observation, but its location and timing must be correct before that observation is useful in a network.

## Step 10: Document, maintain, and improve the station

Create a maintenance log that records software updates, power interruptions, network changes, mounting changes, room changes, and unexpected waveform shifts. When a trace changes, check the station history before attributing the change to geology.

A monthly review can include:

| Check | Question |
|---|---|
| Station uptime | Were there gaps in the record? |
| Clock and timestamps | Are event times aligned with network data? |
| Installation | Did the sensor move, tilt, or contact a new object? |
| Noise floor | Has the ordinary baseline changed? |
| Network state | Can the station still be reached locally and forward data as intended? |
| Metadata | Are location, model, orientation, and privacy settings still correct? |
| Storage and updates | Is the device completing its normal update and recording cycle? |

If you relocate the station, treat it as a new station epoch. Preserve the old metadata and baseline rather than merging the records silently. A change in site conditions can be more significant than a change in software.

## Expected output

A successful setup should produce the following outputs without invented numerical claims:

1. A powered Raspberry Shake that remains reachable on the local network.
2. A completed station record containing model, installation site, orientation, network method, and configuration date.
3. A live local waveform visible through the station interface or approved visualization software.
4. A quiet-baseline log covering more than one period of ordinary activity.
5. A labeled, non-destructive local signal check.
6. At least one candidate event compared with an external station, StationView trace, or authoritative earthquake catalog.
7. A written limitation statement explaining that the station is a personal monitor, not a safety alert or official magnitude service.

Use this compact result table in your lab notebook:

| Field | Result |
|---|---|
| Station model | `...` |
| Installation site | `...` |
| Orientation | `...` |
| First online timestamp | `...` |
| Baseline interval | `...` |
| Visualization method | Local interface / Swarm / StationView |
| Candidate event timestamp | `...` |
| Comparison station or catalog | `...` |
| Interpretation | Local noise / likely regional event / uncertain |
| Known limitations | `...` |

## Troubleshooting and common pitfalls

| Problem | Likely cause | Solution |
|---|---|---|
| `rs.local` does not open | Hostname discovery is unavailable, station and browser are on different networks, or the unit has not completed startup | Confirm Ethernet, check the router’s client list for the IP address, and use the official alternative discovery procedure. |
| The station powers on but shows no waveform | Incomplete startup, sensor-board connection issue, software update, or hardware fault | Wait for first-time update completion, inspect status indicators, and follow the model-specific support procedure. Do not repeatedly remove power during an update. |
| The waveform is dominated by spikes | Footsteps, doors, pumps, HVAC, loose mounting, or cable movement | Improve mounting, route cables securely, identify repeating local sources, and build a baseline before interpreting events. |
| Data forwarding is unavailable | Network firewall, DNS, time synchronization, or configuration problem | Test outbound network access with the administrator, confirm time and location settings, and consult the current official manual. |
| Station location appears offset publicly | Privacy obfuscation or incorrect metadata | Check the platform’s location-privacy explanation and verify the private station record; do not assume the public map is the exact physical coordinate. |
| A signal appears only on this station | Local vibration, nearby construction, vehicle traffic, or a very local event | Compare timing and shape with nearby stations, inspect the baseline, and label the event uncertain until corroborated. |
| A large event is visible but no official alert appears | Different detection thresholds, processing delays, data gaps, or a local artifact | Check authoritative earthquake services and multiple stations; never use the home station as a warning authority. |
| Timestamps do not align with other stations | Clock drift, timezone confusion, network interruption, or display delay | Use a consistent time standard, verify synchronization, and compare raw timestamps rather than screenshots alone. |
| Signal changes after moving furniture | Site coupling or building vibration changed | Treat the move as a new installation epoch and establish a new baseline. |
| The station becomes unreachable after a network change | DHCP address changed, VLAN isolation, or Wi-Fi/Ethernet change | Use the router’s client list, restore the approved network path, and avoid exposing the administration interface publicly. |

## Pro tips and best practices

**Prioritize mounting over software.** A perfectly configured station on a loose shelf can produce less useful data than a modest station firmly coupled to a stable floor. Mechanical noise is often the first limitation to address.

**Keep an event diary.** Note storms, construction, pumps, traffic patterns, parties, maintenance work, and sensor movement. The diary provides context that a waveform alone cannot recover.

**Use network comparison, not waveform intuition.** Human observers are good at seeing dramatic shapes and bad at estimating whether a shape is seismic. Check timing, station geography, and authoritative catalogs before labeling an event.

**Protect credentials and metadata.** Change default credentials, restrict administrative access, keep the station behind a firewall or suitable network segment, and review what location information is shared. The official documentation includes a security step for a reason. [3]

**Do not publish false precision.** A timestamp, amplitude, or epicenter estimate should not contain more precision than the sensor, clock, installation, and analysis support. Label approximate phase picks and uncertain events clearly.

**Separate education from emergency response.** A personal monitor can help you understand seismic waves and observe regional events. It is not an earthquake early-warning system, structural-safety assessment, or replacement for local emergency services.

**Link the experiment to the physics.** For the mechanics behind the signals, continue with New Guide’s [Why Earthquakes Happen: Fault Stress, Friction, and Seismic Rupture](https://newguideforyou.vercel.app/article?slug=why-earthquakes-happen). The tutorial’s instrument observes the consequences of rupture and wave propagation; it does not directly measure fault stress underground.

## Summary and next steps

You can build a useful low-cost earthquake monitor by mounting a supported Raspberry Shake model on a stable structure, connecting it by Ethernet, completing the local configuration, changing default credentials, recording a quiet baseline, and comparing candidate waveforms with other stations or authoritative catalogs.

The key engineering lesson is that **installation and metadata are part of the measurement**. A noisy mounting surface, inaccurate station location, drifting clock, or undocumented software change can mislead the interpretation as easily as a faulty sensor.

The next project is to operate two stations in different rooms or buildings and compare their noise floors over a week. A more advanced study can collect timestamped waveforms from several stations, estimate P–S arrival differences, and investigate why a network can constrain an earthquake location more reliably than a single instrument.

## References

[1]: https://www.usgs.gov/programs/earthquake-hazards/seismographs-keeping-track-earthquakes "U.S. Geological Survey — Seismographs: Keeping Track of Earthquakes"
[2]: https://manual.raspberryshake.org/specifications.html "Raspberry Shake Manual — Technical Specifications"
[3]: https://manual.raspberryshake.org/quickstart.html "Raspberry Shake Manual — Quick Start Guide"
[4]: https://www.iris.edu/hq/programs/epo/life_of_a_seismologist/its_instrumental/what_is_raspberry_shake "IRIS/SAGE — What is Raspberry Shake?"
