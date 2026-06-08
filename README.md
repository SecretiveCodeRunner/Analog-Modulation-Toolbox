# Analog Communication Signal Toolbox

An interactive educational toolbox for exploring analog modulation techniques and signal behavior in real time.

The application provides waveform visualization, spectral analysis, phasor representation, demodulation demonstrations, and noise simulation in a modern React-based interface.

Currently implemented:

- Amplitude Modulation (AM)
  - DSB-FC
  - DSB-SC
  - SSB (USB)
  - VSB
  
Future modules:

- Frequency Modulation (FM)
- Phase Modulation (PM)

## Features

### Modulation Modes

- Double Sideband Full Carrier (DSB-FC)
- Double Sideband Suppressed Carrier (DSB-SC)
- Single Sideband (SSB)
- Vestigial Sideband (VSB)

### Message Signal Generation

Supports multiple message signal shapes:

- Sine
- Square
- Triangle
- Sawtooth
- Pulse

### Real-Time Waveform Visualization

View:
- Message signal
- Carrier signal
- Modulated signal
- Envelope waveform
- Demodulated output

Features include:

- Live animation
- Zoom controls
- Pan controls
- Envelope display
- Responsive scaling

### Frequency Spectrum Analysis

Visualize:
- Carrier component
- Upper sideband (USB)
- Lower sideband (LSB)
- Spectral amplitudes
- Signal bandwidth

### Phasor Representation

Interactive phasor diagrams help visualize:

- Carrier vector
- Sideband vectors
- Modulation behavior

### Demodulation Laboratory

Explore practical demodulation concepts:

- Envelope Detection
- Coherent Detection
- Synchronous Detection
- VSB Equalization Concepts

### Noise Simulation

Add Additive White Gaussian Noise (AWGN):

- Adjustable SNR
- Observe waveform degradation
- Study demodulation performance under noise

### Performance Metrics

The toolbox calculates:

- Total Power
- Carrier Power
- Modulation Index
- Transmission Efficiency
- Signal Bandwidth

## Technologies Used

- React
- Vite
- JavaScript
- HTML5 Canvas
- CSS

---

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
npm install
npm run build
npm run preview
```
##Educational Purpose

This project was developed as a learning and visualization tool for students studying:

Analog Communication
Communication Systems
Electronic Communication Engineering
Signal Processing

The goal is to provide an intuitive and interactive environment for understanding modulation techniques beyond traditional textbook diagrams.


Author:
Apurba Maity,
Electronics and Communication Engineering
