export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10">
        <p className="cursor-hover font-bold text-[16vw] uppercase leading-[0.8] tracking-tight lg:text-[9rem]">
          Innovicon <span className="text-sdg-15">4</span>
          <span className="text-sdg-7">.</span>
          <span className="text-sdg-14">0</span>
        </p>
        <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 text-[11px] uppercase tracking-[0.24em] text-muted-foreground md:flex-row md:justify-between">
          <p>IEEE BVCOE New Delhi Student Branch</p>
          <p>Ansh Jain +91 81308 53875 · Abhipsita Sarkar +91 81308 05947</p>
        </div>
      </div>
    </footer>
  );
}
