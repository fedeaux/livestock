import BraindamageApiProvider from "braindamage/api/provider";
import "initializer";
import ENV from "env";

axios.defaults.baseURL = ENV.API_HOST;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function Platform({ App }) {
  return (
    <BraindamageApiProvider>
      <App />
    </BraindamageApiProvider>
  );
}
