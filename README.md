# Finance Dashboard

A modern, responsive financial management dashboard built with **Vite**, **React.js**, **JavaScript**, and **Tailwind CSS**. Track income, expenses, and gain valuable insights into your spending patterns.

## Features

### Core Features

- **Dashboard Overview**: Real-time financial summary with income, expenses, and balance cards
- **Transaction Management**: Add, view, and delete transactions with full filtering capabilities
- **Charts & Analytics**: Interactive Recharts visualizations including:
  - Area chart for income vs. expenses trends (30-day view)
  - Pie chart for spending breakdown by category
- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Role-Based Access**: Switch between Admin (full access) and Viewer (read-only) modes
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes

### Optional Features

- **Local Storage Persistence**: All data saved automatically to browser storage
- **Advanced Filtering**: Search transactions by description and filter by category
- **Export Functionality**: Export transactions as JSON or CSV files
- **Financial Insights**: Analytics page with savings rate, spending patterns, and recommendations
- **Animated UI**: Smooth transitions and animations throughout the app
- **Empty State Handling**: User-friendly messages when no data is available
- **Floating Action Button**: Quick access to add transactions (Admin mode)
- **Category-Based Organization**: Predefined categories for both expenses and income

**Live URL**
[View Project](https://your-project.vercel.app)

## Getting Started

### Installation

1. **Clone the repository**

```bash
https://github.com/vishnuu5/Finance-Dashboard-Zorvyn.git
cd finance-dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)
   - The app will hot-reload as you make changes

## Tech Stack

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| **Vite**              | Fast build tool and dev server     |
| **React 18**          | UI library and component framework |
| **JavaScript (ES6+)** | Programming language               |
| **Tailwind CSS**      | Utility-first CSS framework        |
| **Recharts**          | Interactive chart library          |
| **Lucide React**      | Icon library                       |
| **React Context API** | State management                   |
| **Local Storage API** | Data persistence                   |

## Usage Guide

### Dashboard

- View your financial summary with income, expenses, and balance
- See 30-day trends of income vs. expenses
- View spending breakdown by category
- Quick access to recent transactions

### Transactions

- View all transactions in a sortable, filterable table
- Search transactions by description
- Filter by category
- Delete transactions (Admin mode only)
- Export data as JSON or CSV

### Insights

- View key metrics: average daily expense, largest expense, savings rate
- Analyze spending patterns by category
- Get personalized recommendations
- Track total transaction count

### Adding Transactions (Admin Mode)

1. Click the floating action button (+) in bottom right
2. Select transaction type (Income/Expense)
3. Choose category
4. Enter description and amount
5. Click "Add"

### Theme & Role Switching

- Click the sun/moon icon in header to toggle dark mode
- Use role buttons (Viewer/Admin) to switch modes
- Settings are saved automatically

## Design System

### Color Palette

- **Primary**: Sky Blue (`#0ea5e9`)
- **Accent**: Purple (`#a855f7`)
- **Success**: Emerald Green (`#10b981`)
- **Danger**: Red (`#ef4444`)
- **Neutral**: Gray scale

### Typography

- **Headings**: Bold, 24px-32px
- **Body**: Regular, 14px-16px
- **Labels**: Medium, 12px-14px

### Spacing & Layout

- Uses Tailwind's spacing scale (4px units)
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3+ columns (desktop)
- Flexbox for component layouts
- Max-width container: 100% (full-width on all devices)

## Data Persistence

All data is automatically saved to browser's localStorage:

- **darkMode**: Theme preference
- **userRole**: Current user role (admin/viewer)
- **transactions**: All financial transactions

Data persists across browser sessions and is never sent to external servers.

## Mock Data

The app comes with 60 pre-generated mock transactions spanning 90 days:

- **Expense Categories**: Food, Transport, Entertainment, Utilities, Shopping
- **Income Categories**: Salary, Freelance, Bonus, Investment
- **Realistic Amounts**: $10-$500 for expenses, $1,000-$5,000 for income

To reset data, clear localStorage:

```javascript
// In browser console
localStorage.clear();
```

## Optional Features Implementation

All optional features are fully implemented:

1. **Dark Mode**
   - Toggle in header
   - Persists to localStorage
   - Applied to all components

2. **Local Storage**
   - Automatic persistence for all data
   - No server needed
   - Data cleared only on user action

3. **Export Functionality**
   - JSON export on Transactions page
   - CSV export for spreadsheet import
   - All filtered data included

4. **Advanced Filtering**
   - Search by description
   - Filter by category
   - Real-time filtering

5. **Financial Insights**
   - Separate Insights page
   - Savings rate calculation
   - Spending pattern analysis
   - Personalized recommendations

6. **Animations**
   - Page transitions (fadeIn, slideUp)
   - Hover effects on interactive elements
   - Smooth theme transitions

7. **Empty State Handling**
   - "No transactions found" message
   - Helpful CTAs
   - Proper styling in dark mode

8. **Role-Based UI**
   - Admin: Full access including add/delete
   - Viewer: Read-only access
   - Modal dialogs only for Admin

## Responsive Breakpoints

- **Mobile**: < 640px (single column, stacked layout)
- **Tablet**: 640px - 1024px (2 columns, mobile menu)
- **Desktop**: > 1024px (3+ columns, fixed sidebar)

All components tested and responsive across all devices.

## Troubleshooting

### Port Already in Use

If port 5173 is busy:

```bash
npm run dev -- --port 3000
```

### Data Not Persisting

- Check browser localStorage is enabled
- Clear browser cache if issues persist
- Use DevTools → Application → Local Storage

### Styles Not Showing

- Ensure Tailwind CSS is properly configured
- Rebuild: `npm run build`
- Clear browser cache (Ctrl+Shift+Delete)

## Security & Best Practices

- All data stored locally (no external API calls)
- No sensitive data transmission
- Input validation on forms
- XSS protection via React's built-in escaping
- Responsive to all screen sizes
- Accessible color contrast ratios
- Semantic HTML structure

## License

This project is open source and available for personal and commercial use.
