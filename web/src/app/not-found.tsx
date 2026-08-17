import { Container } from "@/components/layout/Container";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="grid-motif pt-18">
        <Container className="flex min-h-[70svh] flex-col justify-center py-24">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="font-display text-display-lg mt-4 text-white">
            Esta página no existe
          </h1>
          <p className="text-body-lg mt-4 max-w-lg text-slate-200">
            El enlace que seguiste no lleva a ninguna parte. Volvé al inicio o mirá la
            agenda del día.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/">Ir al inicio</Button>
            <Button href="/agenda" variant="secondary">
              Ver la agenda
            </Button>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
