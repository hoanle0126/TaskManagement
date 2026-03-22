import { getTranslations } from "next-intl/server";

export default async function ListPage() {
  const t = await getTranslations("common");
  return (
    <main>
      <h1>{t("appName")}</h1>
    </main>
  );
}
