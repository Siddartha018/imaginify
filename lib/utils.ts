/* eslint-disable prefer-const */
/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "qs";
import { twMerge } from "tailwind-merge";

import { aspectRatioOptions } from "@/constants";

/**
 * Combines and merges CSS class names using clsx and tailwind-merge
 * @param {...ClassValue[]} inputs - An array of class values to be combined
 * @returns {string} A string of merged and optimized CSS class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ERROR HANDLER
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    if (error.message.includes('Could not connect to any servers in your MongoDB Atlas cluster')) {
      console.error('Connection error: Please ensure your IP address is whitelisted in MongoDB Atlas.');
    } else {
      console.error(error.message);
    }
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === 'string') {
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

// PLACEHOLDER LOADER - while image is transforming
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#7986AC" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

/**
 * Converts a string to its Base64 representation.
 * @param {string} str - The input string to be converted to Base64.
 * @returns {string} The Base64 encoded representation of the input string.
 */
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const dataUrl = `data:image/svg+xml;base64,${toBase64(
  shimmer(1000, 1000)
)}`;
// ==== End

// FORM URL QUERY
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  const params = { ...qs.parse(searchParams.toString()), [key]: value };

  return `${window.location.pathname}?${qs.stringify(params, {
    skipNulls: true,
  })}`;
};

// REMOVE KEY FROM QUERY
export function removeKeysFromQuery({
  /**
   * Removes specified keys from the currentUrl object
   * @param {Array<string>} keysToRemove - An array of keys to be removed from the currentUrl object
   * @returns {void} This function does not return a value
   */
  searchParams,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(searchParams);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // Remove null or undefined values
  Object.keys(currentUrl).forEach(
    /**
     * Removes properties with null values from the currentUrl object
     * @param {string} key - The key of the property to check and potentially delete
     * @returns {void} This function does not return a value, it modifies the currentUrl object in place
     */
    (key) => currentUrl[key] == null && delete currentUrl[key]
  );

  return `${window.location.pathname}?${qs.stringify(currentUrl)}`;
}

/**
 * Sets a timer to execute a function after a specified delay.
 * @param {Function} func - The function to be executed after the delay.
 * @param {number} delay - The time, in milliseconds, the timer should wait before the function is executed.
 * @param {...*} args - Additional arguments to be passed to the function when it's called.
 * @returns {number} The timeout ID that can be used to cancel the timer with clearTimeout().
 */
// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  /**
   * Creates a debounced version of the provided function.
   * @param {Function} func - The function to be debounced.
   /**
    * Retrieves the size (width or height) of an image based on its type and aspect ratio.
    * @param {string} type - The type of image sizing ('fill' or other).
    * @param {any} image - The image object containing dimension properties.
    * @param {'width' | 'height'} dimension - The dimension to retrieve ('width' or 'height').
    * @returns {number} The size of the specified dimension in pixels.
    */
   * @param {number} delay - The delay in milliseconds before the function is called.
   * @returns {Function} A new debounced function that delays invoking func until after delay milliseconds have elapsed since the last time it was invoked.
   */
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// GE IMAGE SIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: any,
  dimension: "width" | "height"
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// DOWNLOAD IMAGE
export const download = (url: string, filename: string) => {
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }

  fetch(url)
    /**
     /**
      * Creates and triggers a download for a blob as a PNG file
      * @param {Blob} blob - The blob to be downloaded
      * @param {string} [filename] - Optional filename for the downloaded file
      * @returns {void} This function doesn't return a value
      */
     * Converts the response to a Blob object
     * @param {Response} response - The response object from a fetch request
     * @returns {Promise<Blob>} A promise that resolves to a Blob containing the response data
     */
    /**
     * Catches and logs any errors that occur in the preceding Promise chain
     * @param {Error} error - The error object caught from the Promise rejection
     * @returns {void} This method doesn't return anything
     */
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;

      if (filename && filename.length)
        a.download = `${filename.replace(" ", "_")}.png`;
      document.body.appendChild(a);
      a.click();
    })
    .catch((error) => console.log({ error }));
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if(obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};