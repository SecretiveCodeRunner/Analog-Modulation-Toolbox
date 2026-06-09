# Analog Communication Signal Toolbox

An interactive web-based educational platform for studying Analog Communication Systems through real-time visualization, spectrum analysis, phasor diagrams, noise simulation, and demodulation experiments.

## Overview

The Analog Communication Signal Toolbox is designed to help students understand analog modulation techniques beyond textbook equations. The application provides real-time signal generation and visualization for Amplitude Modulation (AM), Frequency Modulation (FM), and Phase Modulation (PM).

Users can modify carrier and message parameters, observe waveform behavior, analyze spectra, visualize phasors, simulate channel noise, and study demodulation performance through an integrated virtual communication laboratory.

---

## Features

### Amplitude Modulation (AM)

Supported schemes:

* DSB-FC (Double Sideband Full Carrier)
* DSB-SC (Double Sideband Suppressed Carrier)
* SSB (Single Sideband)
* VSB (Vestigial Sideband)

Capabilities:

* Real-time waveform visualization
* Spectrum analysis
* Phasor representation
* Modulation index calculations
* Envelope observation
* Demodulation laboratory

---

### Frequency Modulation (FM)

Capabilities:

* Single-tone and double-tone modulation
* Instantaneous frequency visualization
* Frequency deviation calculations
* Carson bandwidth estimation
* Spectrum analysis
* Noise simulation
* Demodulation laboratory

---

### Phase Modulation (PM)

Capabilities:

* Single-tone and double-tone modulation
* Phase deviation calculations
* Instantaneous frequency visualization
* Spectrum analysis
* Phasor visualization
* Noise simulation
* Demodulation laboratory

---

### Message Signal Support

Supported message waveforms:

* Sine
* Square
* Triangle
* Sawtooth
* Pulse

Supported configurations:

* Single-tone
* Double-tone

---

### Spectrum Analyzer

The toolbox provides real-time frequency-domain visualization including:

* Carrier component
* Upper sidebands
* Lower sidebands
* Harmonic behavior
* FM and PM spectral expansion
* Bandwidth estimation

---

### Phasor Visualization

Interactive phasor diagrams help visualize:

* Carrier behavior
* Sideband interaction
* Resultant signal formation
* Phase variation
* Modulation dynamics

---

### Noise Simulation

The toolbox includes Additive White Gaussian Noise (AWGN) simulation.

Features:

* Adjustable Signal-to-Noise Ratio (SNR)
* Channel impairment visualization
* Noise propagation through the communication chain
* Impact on recovered signals

---

### Demodulation Laboratory

Allows comparison between:

* Original message signal
* Received signal
* Recovered signal

Users can observe:

* Distortion effects
* Noise influence
* Recovery quality
* Communication-system performance

---

## Technologies Used

* React
* JavaScript (ES6)
* Vite
* HTML5 Canvas
* CSS

---

## Installation

Clone the repository:

```bash
git clone https://github.com/SecretiveCodeRunner/Analog-Modulation-Toolbox.git
```

Navigate to the project directory:

```bash
cd Analog-Modulation-Toolbox
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Educational Applications

This toolbox can be used for:

* Communication Systems laboratories
* Engineering coursework
* Classroom demonstrations
* Self-learning
* Academic projects
* Spectrum analysis demonstrations
* Modulation and demodulation experiments

---

## Future Enhancements

Potential future additions:

* Digital modulation techniques
* FFT-based spectrum engine
* Signal export functionality
* Additional channel models
* Advanced communication-system experiments

---

## Author

Apurba Maity

Electronics and Communication Engineering

---

## License

This project is intended for educational and academic use.
