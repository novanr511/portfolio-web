import { permanentRedirect } from "next/navigation";

/**
 * The stock-price risk summary was replaced by a company finance model built
 * from SEC filings. Older URLs keep working and consolidate ranking signals.
 */
export default function RetiredFinanceRiskDemo() {
  permanentRedirect("/data-analytics/msft-finance-model");
}
