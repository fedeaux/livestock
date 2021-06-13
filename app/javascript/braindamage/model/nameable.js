import { camelize } from "inflected";

export default {
  defineNames() {
    Object.entries(this.schema.names).forEach(([name, value]) => {
      this[`${name}Name`] = value;
    })
  }
}
