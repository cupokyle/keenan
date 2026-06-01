# NationBuilder Graphik Font Setup

This theme is configured to use self-hosted Graphik everywhere: body copy, headings, navigation, forms, buttons, Stripe payment fields, helper text, and the theme runtime brand guard.

## 1. Upload the Graphik OpenType files

In NationBuilder, go to:

`Website > Theme > Current custom theme > Files > New file`

Upload each of these files with the exact filename and `.otf` extension shown below:

| File | CSS weight | CSS style |
| --- | ---: | --- |
| `Graphik-Thin.otf` | 100 | normal |
| `Graphik-ThinItalic.otf` | 100 | italic |
| `Graphik-Extralight.otf` | 200 | normal |
| `Graphik-ExtralightItalic.otf` | 200 | italic |
| `Graphik-Light.otf` | 300 | normal |
| `Graphik-LightItalic.otf` | 300 | italic |
| `Graphik-Regular.otf` | 400 | normal |
| `Graphik-RegularItalic.otf` | 400 | italic |
| `Graphik-Medium.otf` | 500 | normal |
| `Graphik-MediumItalic.otf` | 500 | italic |
| `Graphik-Semibold.otf` | 600 | normal |
| `Graphik-SemiboldItalic.otf` | 600 | italic |
| `Graphik-Bold.otf` | 700 | normal |
| `Graphik-BoldItalic.otf` | 700 | italic |
| `Graphik-Black.otf` | 800 | normal |
| `Graphik-BlackItalic.otf` | 800 | italic |
| `Graphik-Super.otf` | 900 | normal |
| `Graphik-SuperItalic.otf` | 900 | italic |

The SCSS uses `/assets/<filename>.otf`, so the uploaded filenames must match exactly, including capitalization.

## 2. Publish or preview the custom theme

After uploading the font files and the updated theme files, publish the custom theme or open the public preview. The Google Fonts embed has been removed from the main, protected, and splash layouts, so Graphik should be the only active family after the `.otf` files are available.

## 3. Verify in the browser

Open the live page, then use browser DevTools:

1. Go to the **Network** tab and filter by `Graphik` or `font`.
2. Confirm the needed `.otf` files return `200` responses, not `404`.
3. Inspect body text and headings and confirm the computed `font-family` starts with `Graphik`.
4. Check a donation page if Stripe fields are used; their style configuration now also requests Graphik.

## 4. Troubleshooting

- If Graphik does not render, first check for filename mismatches such as missing `.otf`, different capitalization, or `ExtraLight` instead of `Extralight`.
- If a browser reports `404` for a font, re-upload that exact file in the theme **Files** area.
- If only some weights look wrong, make sure the matching normal and italic files were uploaded for that weight.
- If the OpenType files are very restrictive or blocked by a CDN/browser, convert the same licensed font files to `woff2`, update the `@font-face` URLs and `format()` declarations in `theme.scss`, and upload the converted files instead.
