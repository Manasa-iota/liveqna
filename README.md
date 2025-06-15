LiveQnA is a real-time audience interaction interface that allows users to submit feedback or questions with hashtag-based categorization. It enables simple company-based filtering and real-time visual updates, making it ideal for live events, mock interviews, and feedback systems.

Features
--------

1. **Submit Questions with Hashtags**
   - Users can submit text-based feedback/questions.
   - Input must include a company hashtag (e.g., #Amazon), or submission is marked invalid.

2. **Hashtag-Based Company Categorization**
   - Feedback is automatically categorized based on the hashtag used.
   - The hashtag (e.g., #Google) is parsed to extract the company name.

3. **Filter by Selected Company**
   - Users can click on a company hashtag to filter and view only the feedback/questions related to that company.

4. **Visual Validation on Submission**
   - Green/red form highlighting shows whether a submission is valid or invalid.
   - Input character limit enforced (MAX_CHARACTERS constant).

5. **Loading and Error Handling**
   - Loading spinner shown while fetching feedbacks.
   - Error message shown if feedback fetch fails.

6. **Persistent Feedback Storage (Mock API)**
   - Feedback is sent to a mock API (bytegrad.com) using fetch().
   - Duplicate feedback items are filtered out by ID.

7. **Dynamic UI Using Zustand**
   - State management (feedback list, selected company, loading/error) handled with Zustand.
   - Custom hooks and store for modular and reactive updates.

8. **Reusable, Modular Component Design**
   - Components: FeedbackForm, FeedbackList, HashtagList, etc.
   - Styled with CSS modules and utility classes.

Tech Stack
----------

- React + TypeScript
- Zustand (State Management)
- Vite (Build Tool)
- Lucide-react (Icons)
- CSS Modules

Setup Instructions
------------------

### Prerequisites
- Node.js >= 16.x
- pnpm / npm / yarn

### Installation

```bash
git clone https://github.com/yourusername/liveqna.git
cd liveqna
npm install
npm run dev
