# 🎵 Spotify Player Setup Guide

Your portfolio now includes a beautiful, floating Spotify player that visitors can use to listen to music while browsing!

## ✨ Features

- 🎨 **Glassmorphic Design** - Matches your portfolio's aesthetic
- 📱 **Responsive** - Works on all devices
- 🔄 **Minimizable** - Can be minimized to save space
- 🎯 **Floating Widget** - Positioned at bottom-right, doesn't interfere with content
- 🎵 **Full Spotify Integration** - Supports playlists, tracks, albums, and artists

## 🎛️ How to Customize

### Option 1: Use Your Own Playlist (Recommended)

1. **Create or find your Spotify playlist**
2. **Get the Playlist ID**:
   - Open your playlist on Spotify
   - Click the "..." menu → "Share" → "Copy link to playlist"
   - The link looks like: `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`
   - The ID is the part after `/playlist/`: `37i9dQZF1DXcBWIGoYBM5M`

3. **Update the component in `app/page.tsx`**:
   ```tsx
   <SpotifyPlayer 
     playlistId="YOUR_PLAYLIST_ID_HERE"
   />
   ```

### Option 2: Use a Specific Track

```tsx
<SpotifyPlayer 
  trackId="4cOdK2wGLETKBW3PvgPWqT" // Replace with your track ID
/>
```

### Option 3: Use an Album

```tsx
<SpotifyPlayer 
  albumId="1ATL5GLyefJaxhQzSPVrLX" // Replace with your album ID
/>
```

### Option 4: Use an Artist

```tsx
<SpotifyPlayer 
  artistId="4Z8W4fKeB5YxbusRsdQVPb" // Replace with your artist ID
/>
```

## 📋 Getting Spotify IDs

### From Spotify Web/Desktop App:
1. Right-click on the playlist/track/album/artist
2. Click "Share" → "Copy link to [item]"
3. The ID is the last part of the URL after the final `/`

### Example URLs:
- **Playlist**: `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`
  - ID: `37i9dQZF1DXcBWIGoYBM5M`
- **Track**: `https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT`
  - ID: `4cOdK2wGLETKBW3PvgPWqT`
- **Album**: `https://open.spotify.com/album/1ATL5GLyefJaxhQzSPVrLX`
  - ID: `1ATL5GLyefJaxhQzSPVrLX`
- **Artist**: `https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb`
  - ID: `4Z8W4fKeB5YxbusRsdQVPb`

## 🎨 Customization Options

### Change Player Size

```tsx
<SpotifyPlayer 
  playlistId="YOUR_PLAYLIST_ID"
  width="100%"
  height="380" // Adjust height (default: 380)
/>
```

### Use Compact Mode

```tsx
<SpotifyPlayer 
  playlistId="YOUR_PLAYLIST_ID"
  compact={true}
/>
```

## 🎯 Recommended Playlists for Portfolio

- **Focus/Work Music**: Instrumental, lo-fi, ambient
- **Coding Playlists**: Electronic, synthwave, chill beats
- **Your Personal Playlist**: Show your music taste!

## 📱 User Experience

### How It Works:
1. **Floating Button**: A music icon button appears at the bottom-right
2. **Click to Open**: Opens the Spotify player widget
3. **Minimize**: Click the minimize button to collapse it
4. **Close**: Click the X button to hide it completely
5. **Reopen**: The floating button reappears when closed

### Positioning:
- **Desktop**: Bottom-right corner
- **Mobile**: Bottom-right, responsive width
- **Z-index**: Set to 40, above content but below modals

## 🔧 Advanced Customization

### Change Position

Edit `SpotifyPlayer.tsx` and modify the positioning classes:
```tsx
className={`fixed ${isMinimized ? "bottom-6 right-6" : "bottom-6 left-6"}`}
```

### Change Colors

The component uses your portfolio's neon mint color (`text-neon-mint`). To change:
1. Update the color classes in `SpotifyPlayer.tsx`
2. Or modify your Tailwind config

## 🚀 Deployment

The Spotify player works automatically on Vercel! No additional configuration needed.

## ⚠️ Important Notes

1. **Spotify Account Required**: Users need a Spotify account (free or premium) to play music
2. **Embed Limitations**: Some tracks may not be available in all regions
3. **Autoplay**: Spotify's embed doesn't support autoplay (user must click play)
4. **Premium Features**: Some features require Spotify Premium

## 🎵 Current Default

The player currently uses Spotify's "Today's Top Hits" playlist as a default. Update it to your own playlist for a personalized experience!

## 📝 Example: Personal Coding Playlist

```tsx
<SpotifyPlayer 
  playlistId="YOUR_CODING_PLAYLIST_ID"
  height="400"
/>
```

Enjoy your new Spotify player! 🎶

