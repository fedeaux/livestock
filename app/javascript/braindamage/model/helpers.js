export function attributeAsProperty(name, properties) {
  return {
    get: function() {
      return this["@" + name];
    },
    set: function(value) {
      return setAttributeValue(this, name, value, properties);
    }
  };
};

export function setAttributeValue(instance, name, value, properties) {
  instance["@"+name] = value;
};

// let model, type, v;

// if (value === void 0 && attribute["default"] !== void 0) {
//   if (typeof attribute["default"] === "function") {
//     value = attribute["default"]();
//   } else {
//     value = attribute["default"];
//   }
// }
// if (attribute.type || attribute.types) {
//   if (!value) {
//     return;
//   }
//   if (attribute.type) {
//     model = attribute.type;
//   } else {
//     model = ((function() {
//       var i, len, ref, results;
//       ref = attribute.types;
//       results = [];
//       for (i = 0, len = ref.length; i < len; i++) {
//         type = ref[i];
//         if (type.class_name === value.type) {
//           results.push(type);
//         }
//       }
//       return results;
//     })())[0];
//   }
//   if (!model) {
//     console.error("Cannot infer type for " + name + "=" + value + ". Assigning null instead.");
//     return;
//   }
//   if (Array.isArray(value)) {
//     return object["_" + name] = (function() {
//       var i, len, results;
//       results = [];
//       for (i = 0, len = value.length; i < len; i++) {
//         v = value[i];
//         results.push(new model(v));
//       }
//       return results;
//     })();
//   } else {
//     return object["_" + name] = new model(value);
//   }
// } else {
//   return object["_" + name] = value;
// }
