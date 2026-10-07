# ImageKit Integration Guide

Vaishnava Mart is built to deliver optimized, responsive images via an ImageKit-ready abstraction.

---

## 1. Direct URL Pasting (Supported Out-of-the-Box)

The Super Admin product wizard, section editor, and category creator immediately support pasting ImageKit CDN URLs directly:
- **Product Wizard:** Exactly 4 image slots for product photography.
- **Section Blocks:** Banner and story visual URLs.
- **Category Creator:** Category banner and icon URLs.

---

## 2. Setting Up an ImageKit Media Library

1. Sign up at [ImageKit.io](https://imagekit.io/).
2. Create an image media folder for `vaishnavamart`.
3. In Developer Options > API Keys, obtain your URL Endpoint and Public Key.
4. Set the following environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/vaishnavamart
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_your_public_key_here
   IMAGEKIT_PRIVATE_KEY=private_your_private_key_here
   ```

> ⚠️ `IMAGEKIT_PRIVATE_KEY` must remain on the server and never be placed in client components.
