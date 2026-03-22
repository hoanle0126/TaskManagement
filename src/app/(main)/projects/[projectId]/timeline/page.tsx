import { getTranslations } from "next-intl/server";

export default async function TimelinePage() {
  const t = await getTranslations("common");
  return (
    <main>
      <h1>{t("appName")}</h1>
    </main>
  );
}
