# FX-991CW ClassWiz Calculator

A fully functional web-based replica of the CASIO FX-991CW ClassWiz scientific calculator with all standard scientific calculator features.

## ✅ FEATURES IMPLEMENTED

### Basic Calculator Functions
- **Basic Arithmetic**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Number Input**: 0-9 digits with decimal point support
- **Clear Functions**: AC (All Clear) and backspace functionality
- **Sign Change**: +/- toggle for positive/negative numbers

### Scientific Functions
- **Trigonometric Functions**:
  - sin, cos, tan (normal functions)
  - sin⁻¹, cos⁻¹, tan⁻¹ (inverse functions via SHIFT)
  - Support for DEG, RAD, and GRAD angle modes

- **Logarithmic Functions**:
  - log (base 10 logarithm)
  - ln (natural logarithm)
  - 10ˣ (antilog via SHIFT + log)
  - eˣ (exponential via SHIFT + ln)

- **Power Functions**:
  - x² (square)
  - √x (square root via SHIFT + x²)
  - xʸ (power function)
  - x⁻¹ (reciprocal)

- **Special Functions**:
  - x! (factorial via SHIFT + x⁻¹)
  - Percentage calculations (via SHIFT + brackets)
  - Scientific notation (×10ˣ)

### Advanced Features
- **Memory Functions**:
  - STO (Store to memory via SHIFT + RCL)
  - RCL (Recall from memory)

- **Mode Functions**:
  - MODE: Cycle through angle modes (DEG → RAD → GRAD)
  - SHIFT: Access secondary functions on keys
  - Answer recall (Ans via SHIFT + ×10ˣ)

- **Display Features**:
  - Main display with green LCD-style text
  - History display showing previous operations
  - Mode indicators (DEG/RAD/GRAD, COMP)
  - Automatic number formatting and scientific notation

## 🎮 HOW TO USE

### Basic Operations
1. **Numbers**: Click number keys 0-9 or use keyboard
2. **Decimal**: Click . key or press . on keyboard
3. **Operations**: Click +, -, ×, ÷ keys or use +, -, *, / on keyboard
4. **Calculate**: Click = key or press Enter
5. **Clear**: Click AC key or press Escape

### Scientific Functions
1. **Trigonometry**: 
   - Click sin, cos, or tan for normal functions
   - Press SHIFT then sin/cos/tan for inverse functions
   - Change angle mode with MODE key

2. **Logarithms**:
   - Click log for log₁₀ or ln for natural log
   - Press SHIFT + log for 10ˣ
   - Press SHIFT + ln for eˣ

3. **Powers**:
   - Click x² for square
   - Press SHIFT + x² for square root
   - Click x⁻¹ for reciprocal
   - Press SHIFT + x⁻¹ for factorial

### Memory Functions
- **Store**: Press SHIFT + RCL to store current number
- **Recall**: Press RCL to recall stored number

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operations**: +, -, *, /
- **Calculate**: Enter or =
- **Clear**: Escape
- **Decimal**: .
- **Backspace**: Backspace
- **Brackets**: ( and )

## 🎨 DESIGN FEATURES

### Authentic ClassWiz Styling
- **Realistic Design**: Modeled after the actual FX-991CW ClassWiz
- **3D Effect**: Subtle 3D rotation that levels on hover
- **Premium Materials**: Dark calculator body with premium button styling
- **Color Coding**: 
  - Orange operation keys
  - Green equals key
  - Red clear key
  - Gray number keys
  - Dark function keys

### Display
- **LCD Style**: Green text on black background with glow effect
- **Dual Display**: Main display and history line
- **Mode Indicators**: Shows current angle mode and calculation mode
- **Auto-formatting**: Scientific notation for very large/small numbers

### Responsive Design
- **Mobile Friendly**: Optimized for touch devices
- **Adaptive Layout**: Scales properly on different screen sizes
- **Touch Feedback**: Visual feedback for key presses

## 🚀 GETTING STARTED

1. **Open the Calculator**:
   ```bash
   # Simply open index.html in your web browser
   open index.html
   ```

2. **No Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries required

3. **Local File**: Can be run directly from the file system without a web server

## 📱 BROWSER COMPATIBILITY

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 TECHNICAL DETAILS

### Files Structure
- `index.html` - Main HTML structure
- `style.css` - Complete styling and responsive design
- `calculator.js` - All calculator functionality and logic

### Key Features in Code
- **Object-Oriented Design**: Clean class-based architecture
- **Event Handling**: Mouse and keyboard input support
- **State Management**: Proper handling of calculator state
- **Error Handling**: Division by zero protection and input validation
- **Precision**: Proper floating-point arithmetic handling

## 🎯 ACCURACY NOTES

- **Trigonometric Functions**: High precision with proper angle conversion
- **Floating Point**: Rounds to 10 significant figures to avoid JavaScript precision issues
- **Scientific Notation**: Automatic formatting for very large or small numbers
- **Memory**: Persistent during calculator session

## 🔮 FUTURE ENHANCEMENTS

The calculator currently implements all standard scientific calculator features. Potential future additions could include:
- Complex number calculations
- Matrix operations
- Statistical functions
- Unit conversions
- Equation solving
- Graphing capabilities

---

**Enjoy your authentic FX-991CW ClassWiz calculator experience!** 🧮✨