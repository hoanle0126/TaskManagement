import { getTranslations } from "next-intl/server";

export default async function FocusPage() {
  const t = await getTranslations("common");
  return (
    <main>
      <h1>{t("appName")}</h1>
    </main>
  );
}
