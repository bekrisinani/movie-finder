declare module '*.scss' {
  const content: { [className: string | null | undefined]: string };
  export = content;
}

// declare module '*.png' {
//   const content: any;
//   export = content;
// }
