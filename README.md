# Grace Community Church Website

A comprehensive church website with Firebase integration, featuring both a public interface and an admin panel.

## Features

### Public Interface
- **Homepage**: Welcoming church introduction
- **Scripture Search**: Search by book, chapter, and verse
- **Events Schedule**: View upcoming church events with dates and times
- **Notifications**: Latest messages from church administration
- **Prayer Requests**: Submit prayer requests (public/anonymous options)

### Admin Panel
- **Hidden Access**: Secret admin login (click the gear icon ⚙ in bottom-right)
- **Notifications Management**: Add, view, and delete church notifications
- **Events Management**: Create, view, and delete church events
- **Prayer Management**: View prayer requests and approve for public display
- **Books/Resources**: Upload and manage PDF books and resources

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Realtime Database**:
   - Go to "Realtime Database" in the sidebar
   - Click "Create Database"
   - Start in test mode (you can secure it later)
4. Enable **Storage**:
   - Go to "Storage" in the sidebar
   - Click "Get started"
   - Use default rules for now

### 2. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web (</>) 
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### 3. Update Website Configuration

1. Open `index.html`
2. Find the Firebase configuration section (around line 340):
```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com/",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};
```
3. Replace with your actual Firebase configuration

### 4. Admin Access

- **Password**: `church2024` (change this in the code for security)
- **Access**: Click the gear icon (⚙) in the bottom-right corner
- **Location in code**: Line 350 - `const ADMIN_PASSWORD = "church2024";`

## Database Structure

The Firebase Realtime Database will automatically create these structures:

```
/notifications
    /{notificationId}
        title: "string"
        message: "string" 
        timestamp: number

/events
    /{eventId}
        title: "string"
        date: "YYYY-MM-DD"
        time: "HH:MM"
        description: "string"
        timestamp: number

/prayers
    /{prayerId}
        name: "string"
        request: "string"
        anonymous: boolean
        public: boolean
        timestamp: number

/books
    /{bookId}
        title: "string"
        author: "string"
        description: "string"
        fileUrl: "string"
        fileName: "string"
        timestamp: number
```

## File Structure

```
/workspace/
├── index.html          # Main website file (contains everything)
├── README.md          # This setup guide
└── firebase-rules.json # Firebase security rules (optional)
```

## Responsive Design

The website is fully responsive and works on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones

## Security Considerations

### For Production Use:

1. **Change Admin Password**: Update the password in the JavaScript code
2. **Firebase Rules**: Implement proper Firebase security rules
3. **HTTPS**: Deploy on HTTPS (Firebase Hosting provides this automatically)
4. **Input Validation**: Add server-side validation for all inputs

### Recommended Firebase Rules:

```json
{
  "rules": {
    "notifications": {
      ".read": true,
      ".write": "auth != null"
    },
    "events": {
      ".read": true,
      ".write": "auth != null"
    },
    "prayers": {
      ".read": "auth != null",
      ".write": true
    },
    "books": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Deployment Options

### Option 1: Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run: `firebase login`
3. Run: `firebase init hosting`
4. Deploy: `firebase deploy`

### Option 2: Any Web Server
- Upload `index.html` to any web hosting service
- Ensure HTTPS is enabled
- Update Firebase configuration if domain changes

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Scripture Integration

The current version includes a placeholder for scripture search. To add real scripture functionality:

1. **Bible Gateway API**: Integrate with Bible Gateway API
2. **ESV API**: Use Crossway's ESV API
3. **Open Bible API**: Use free Bible APIs
4. **Local Database**: Store scripture text in Firebase

## Support

For questions or issues:
1. Check Firebase Console for database/storage issues
2. Check browser console for JavaScript errors
3. Verify Firebase configuration is correct
4. Ensure Firebase services are enabled

## License

This project is created for Grace Community Church. Modify and use as needed for your church's requirements.