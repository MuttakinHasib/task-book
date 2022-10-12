import withTwindDocument from "@twind/next/shim/document";
import Document from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
}

export default withTwindDocument(MyDocument);
