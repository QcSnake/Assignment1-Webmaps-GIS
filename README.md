# Web-based GIS Application

This project is a web-based GIS application built with Flask and Leaflet.js that demonstrates various mapping and spatial analysis tasks.

## Prerequisites

Before running the application, make sure you have the following installed:

- Python 3.6 or higher
- pip (Python package manager)

## Installation

1. Clone the repository or download the project files
   ```
   git clone <repository-url>
   ```
   or extract the downloaded files to your preferred location.

2. Navigate to the project directory
   ```
   cd Assignment1-Webmaps-GIS
   ```

3. Create a virtual environment (recommended)
   ```
   python -m venv venv
   ```

4. Activate the virtual environment
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```
     source venv/bin/activate
     ```

5. Install the required packages
   ```
   pip install flask
   ```

## Running the Application

1. Ensure you're in the Assignment1 directory:
   ```
   cd Assignment1
   ```

2. Start the Flask application:
   ```
   python app.py
   ```

3. Open your web browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

The application will run in debug mode, allowing for automatic reloading when changes are made to the code.

## Project Structure

```
Assignment1-Webmaps-GIS/
├── Assignment1/
│   ├── app.py                   # Flask application entry point
│   ├── static/
│   │   ├── css/                 # CSS files including Leaflet styles
│   │   ├── js/                  # JavaScript files
│   │   │   ├── task1.js         # Task 1 implementation
│   │   │   ├── task2.js         # Task 2 implementation
│   │   │   ├── task3.js         # Task 3 implementation
│   │   │   ├── task4.js         # Task 4 implementation
│   │   │   ├── task5.js         # Task 5 implementation
│   │   │   ├── vg_task1.js      # VG Task 5 implementation
│   │   │   ├── vg_task2.js      # VG Task 6 implementation
│   │   │   ├── supermarket.js   # Supermarket data
│   │   │   └── fuelstation.js   # Fuel station data
│   │   └── plugins/             # Leaflet plugins
│   └── templates/
│       └── index.html           # Main HTML template
└── README.md                    # This file
```

## Features

The application includes several GIS tasks that can be accessed via the buttons on the right side of the interface:

- Task 1: Basic mapping functionality
- Task 2: Data visualization
- Task 3: Spatial analysis
- Task 4: Additional GIS functionality
- Task 5: Advanced analysis
- VG Task 5: Extended functionality
- VG Task 6: Advanced spatial operations

Click on each task button to see the corresponding functionality in action. Use the "Reset" button to clear the map and return to the initial state.

## Sidebar

The application includes a sidebar that displays additional information based on the selected task. The sidebar can be shown/hidden as needed.
