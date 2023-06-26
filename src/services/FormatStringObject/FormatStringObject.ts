class FormatStringObject {
  format (dataObject: any, ignoreObject: any) {
    if (!Array.isArray(dataObject)) {
      this.doFormat(dataObject, ignoreObject);
    } else {
      dataObject.map((object) => {
        this.doFormat(object, ignoreObject);
      });
    }

    return dataObject;
  }

  doFormat (dataObject: any, ignoreObject: any) {
    Object.keys(dataObject).map((key, index) => {
      if (typeof dataObject[key] === "string") {
        const resultCek = ignoreObject.find((element: any) => String(element).toUpperCase().trim() === String(key).toUpperCase().trim());
        if (!resultCek) {
          dataObject[key] = String(dataObject[key]).toUpperCase().trim();
        }
      }
    });

    return dataObject;
  }

  stringToBoolean (stringValue: string) {
    switch (stringValue?.toLowerCase()?.trim()) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error("Cannot Convert To Boolean");
    }
  }
}

export default FormatStringObject;
