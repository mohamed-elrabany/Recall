import Section from "../ui/Section";
import Row from "../ui/Row";

import { FiDownload } from "react-icons/fi";

export default function Data() {
  return (
    <Section title="Data">
      <Row label="Export your saves" description="Download as JSON or CSV">
        <button className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline transition-all duration-150 ease-in-out cursor-pointer">
          <FiDownload />
          Export
        </button>
      </Row>
    </Section>
  );
}
