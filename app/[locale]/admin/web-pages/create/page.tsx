import { Metadata } from "next";

import { WebPageForm } from "@/app/[locale]/admin/web-pages/web-page-form";

export const metadata: Metadata = {
  title: "Create WebPage",
};

const CreateWebPagePage = () => {
  return (
    <>
      <h1 className="h1-bold">Create WebPage</h1>

      <div className="my-8">
        <WebPageForm type="Create" />
      </div>
    </>
  );
};

export default CreateWebPagePage;
