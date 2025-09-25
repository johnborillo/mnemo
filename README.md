# mnemo

## Project Title & Description
`mnemo` is a Progressive Web Application (PWA) built with Next.js that helps you understand how your days *feel* in hindsight. It allows you to log daily experiences related to "novelty" and "perceived day length," providing insights into how these factors correlate and influence your perception of time. The application aims to reveal why some days fly by quickly while others feel long and rich.

## Features
*   **Daily Logging:** Record your "perceived day length" (0-100 slider) and various "novelty" factors:
    *   Unique places visited
    *   New people met
    *   Photo bursts
    *   Task switches
    *   Emotional mood (1-5)
*   **Insights Dashboard:** Visualize and analyze your data with:
    *   A weekly summary, including average perceived length and the correlation between novelty and perceived length.
    *   A "Novelty vs Perceived Length" chart.
    *   "Top Drivers" that highlight which novelty factors (e.g., places, people, photos, switches) had the most significant impact on your perceived day length for the week.
*   **Progressive Web App (PWA):** Enjoy an enhanced user experience with offline capabilities and the option to install the application directly to your device.
*   **Local Data Storage:** All your journal entries and personal data are stored securely on your device using IndexedDB, ensuring complete privacy.

## How it Works
`mnemo` operates on the principle that the richness and novelty of your experiences influence your perception of time.

1.  **Perceived Day Length:** Each day, you rate how long the day *felt* to you on a scale from 0 (very short) to 100 (very long). This is the primary metric for analysis.
2.  **Novelty Factors:** You log various elements that contribute to a day's uniqueness:
    *   **Unique places visited:** The number of different locations you experienced.
    *   **New people:** The number of new individuals you interacted with.
    *   **Photo bursts:** Instances where you took multiple photos in quick succession, often indicating memorable moments.
    *   **Task switches:** An estimate of how often you changed tasks or activities.
    *   **Emotional mood:** A rating of your overall emotional state.
3.  **Standard Deviation (Z-score):** To quantify "novelty," the app compares your daily inputs for each factor against your personal historical average and variability (standard deviation). A z-score indicates how far a particular day's metric deviates from your norm. For example, if you usually visit 2 places a day (average) with a spread of ±1 (SD), then a day with 4 places = +2 SD = unusually novel.
4.  **Novelty Density:** Your daily novelty score is a sum of the z-scores for all novelty factors. A positive score indicates a richer, more unusual day compared to your baseline, while a negative score suggests a more routine day.
    *   `Novelty = places + people + photos + task switches (+ mood variability)`
5.  **Link to Felt Time:** Research suggests that richer, more novel days are encoded with more memory "chunks," making them feel longer in hindsight. Conversely, routine days leave fewer traces and tend to feel shorter. `mnemo` analyzes the correlation between your calculated novelty density and your perceived day length to identify what truly stretches or compresses time for you.

## Technology Stack
*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS, Flowbite
*   **State Management:** React Hooks
*   **Data Storage:** Dexie.js (IndexedDB for local, client-side data persistence)
*   **Charting:** Recharts
*   **PWA Integration:** `next-pwa`
*   **UI Components:** Radix UI, Lucide React, Next.js View Transitions

## Installation

To set up and run `mnemo` locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/johnborillo/mnemo.git
    cd mnemo
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

4.  **Build for production (optional):**
    ```bash
    npm run build
    npm run start
    ```

## Usage

1.  **Log Your Day:** Navigate to the `/log` page (or click "Journal" in the navbar). Use the slider to set your "Perceived Day Length" and input values for the various novelty factors. Click "Save Entry" to record your day.
2.  **View Insights:** Visit the `/insights` page (or click "Insights" in the navbar) to see your weekly summary, novelty chart, and top drivers.
3.  **Learn More:** The `/about` page provides a detailed explanation of the app's concepts and methodology.

## Data Storage & Privacy
`mnemo` is designed with your privacy in mind. All your journal data is stored exclusively on your device within your browser's IndexedDB. No data is sent to any external servers. You have full control over your information.

## Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).
