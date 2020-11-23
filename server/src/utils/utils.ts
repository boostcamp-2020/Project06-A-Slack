export const verifyRequestData = (arr: any[]): boolean =>
  arr.every((e) => {
    console.log(e);
    return e !== undefined && e !== null;
  });
