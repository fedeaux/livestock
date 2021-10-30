import { camelize } from "inflected";

export default {
  defineNames() {
    if(!this.schema.names) return;

    Object.entries(this.schema.names).forEach(([name, value]) => {
      this[`${name}Name`] = value;
    })
  }
}
