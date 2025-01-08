import { getTranslations } from "next-intl/server";

const LoadingPage = async () => {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        {t("Loading.Loading")}
      </div>
    </div>
  );
};

export default LoadingPage;