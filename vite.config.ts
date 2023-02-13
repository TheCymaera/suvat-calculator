import { defineConfig } from "vite";
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ }) => {

	const page_url = "https://heledron.com/tools/suvat-calculator/"

	const page_title					= "Suvat Calculator";
	const page_description		= "Suvat Calculator.";
	const page_author					= "Morgan";
	const page_keywords				= "Heledron, Hadron, Cymaera, suvat, physics, Newton, equations, of, motion";
	const page_og_title 				= page_title;
	const page_og_description 	= page_description;
	const page_og_url 					= page_url;
	const page_og_image 				= page_og_url + "thumbnail.png";
	const page_og_type 					= "website";

  return {
		base: "./",
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
						page_url,
						page_title,
						page_description,
						page_author,
						page_keywords,
						page_og_title,
						page_og_description,
						page_og_url,
						page_og_image,
						page_og_type,
          }
        }
      }),
    ],
  }
});