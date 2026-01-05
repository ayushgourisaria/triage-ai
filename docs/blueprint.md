# **App Name**: TriageAI

## Core Features:

- ED Overview Dashboard: Aggregates real-time patient data (parsed from CSV) to provide a high-level view of the ED, including total patients, risk distribution, and predicted admissions.
- Live ED Census: Displays the CSV data in a sortable and filterable table, showing all active ED patients with emphasis on high-risk cases. Recommends patient priority ordering based on machine learning inferred or mocked patient risk, displayed via triage data and time in ED.
- Patient Details Page: Displays all relevant fields for a selected patient from the Live ED Census, including vitals, arrival info, and disposition-related data. Navigation links enable easy switching between patient details and census.
- Predictive Risk Model: Uses patient data and chief complaint to infer risk scores and predict likely admissions based on a mock admission risk calculation tool.
- Navigation Bar: Enables persistent navigation between the ED Overview, Live ED Census, and Patient Detail pages for seamless dashboard use.

## Style Guidelines:

- Primary color: Deep sky blue (#3EB489) evokes feelings of safety and assurance.
- Background color: Light gray (#F0F0F0) provides a neutral and clean backdrop for the data.
- Accent color: Light cyan (#B0E57C) highlights important metrics and interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif, will provide a modern, objective, neutral, machined look suitable for data-rich display.
- Use clear, universally recognizable icons to represent different data categories and actions.
- Use a clean, grid-based layout to organize data logically across all dashboard pages.
- Subtle transitions and animations to provide feedback on user interactions and data updates.