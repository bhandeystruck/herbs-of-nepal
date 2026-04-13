import { Container } from "@/components/layout/container";

/**
 * Main public site footer.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <Container className="py-8">
        <div className="space-y-2 text-sm text-stone-600">
          <p className="font-medium text-stone-900">Herbs of Nepal</p>
          <p>
            Educational information about Nepalese herbs, traditional uses,
            preparation methods, and safety considerations.
          </p>
          <p className="text-xs text-stone-500">
            This platform is for educational purposes and does not replace
            professional medical advice.
          </p>
        </div>
      </Container>
    </footer>
  );
}