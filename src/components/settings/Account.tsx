import Section from "../ui/Section";
import Row from "../ui/Row";
import type { Profile } from "../../types/profile";
import { useState, useRef } from "react";
import { getInitials } from "../../utils/nameInitials";

import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCameraAlt, MdDeleteOutline } from "react-icons/md";

export default function Account({ user = null, setOpenModal, setAvatarUrl }: { user: Profile | null; setOpenModal: (open: boolean) => void; setAvatarUrl: (url: string) => void }) {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [openAvatarOptions, setOpenAvatarOptions] = useState<boolean>(false);
  const initials = getInitials(user?.full_name);

      function handleButtonClick() {
        if (imageInputRef.current) {
          imageInputRef.current.click();
        }
      }

      function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        const imageURL = file ? URL.createObjectURL(file) : "";
        setAvatarUrl(imageURL);
        setOpenAvatarOptions(false);
        setOpenModal(true);
      }


  return (
    <Section title="Account">
      {/* Avatar */}
      <div className="flex items-center gap-4 px-5 py-5 border-b border-border">
        <div className="relative">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-extrabold text-primary"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {initials}
            </div>
          )}

          {/* Camera button */}
          <button
            type="button"
            onClick={() => setOpenAvatarOptions(!openAvatarOptions)}
            className="
      absolute -bottom-1 -right-1
      flex h-7 w-7 items-center justify-center
      rounded-full
      bg-primary
      text-white
      shadow-md
      ring-2 ring-card
      transition-transform duration-150
      hover:scale-105
    "
          >
            <MdOutlineCameraAlt className="h-4 w-4" />
          </button>

          {/* Avatar options */}
          {openAvatarOptions && (
            <div
              className="
        absolute top-full z-20 mt-3
        w-40 
        overflow-hidden
        rounded-xl
        border border-border
        bg-card
        p-1
        shadow-xl
      "
            >
              <button
              onClick={handleButtonClick}
                type="button"
                className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-sm text-foreground
          transition-colors duration-150
          hover:bg-primary/10
        "
              >
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e)} ref={imageInputRef}></input>
                <MdOutlineCameraAlt className="h-5 w-5 text-muted-foreground" />
                <span>Change photo</span>
              </button>

              {user?.avatar_url && (
                <button
                  type="button"
                  className="
            flex w-full items-center gap-3
            rounded-lg px-3 py-2.5
            text-sm text-destructive
            transition-colors duration-150
            hover:bg-destructive/10
          "
                >
                  <MdDeleteOutline className="h-5 w-5" />
                  <span>Remove photo</span>
                </button>
              )}
            </div>
          )}
        </div>
        <div>
          <p
            className="text-base font-bold text-foreground"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {user?.full_name || "Mohamed Loay"}
          </p>
          <p className="text-sm text-muted-foreground">
            {user?.email || "lolo@outlook.com"}
          </p>
          <p className="text-xs text-secondary mt-0.5 font-medium">312 saves</p>
        </div>
      </div>
      <Row label="Full name">
        <p className="text-sm text-foreground">
          {user?.full_name || "Mohamed Loay"}
        </p>
      </Row>
      <Row label="Email address">
        <p className="text-sm text-foreground">
          {user?.email || "lolo@outlook.com"}
        </p>
      </Row>
      <Row label="Change password">
        <button className="text-primary flex items-center gap-2 text-sm font-semibold hover:underline transition-all duration-150 ease-in-out cursor-pointer">
          Update password
          <IoIosArrowForward />
        </button>
      </Row>
    </Section>
  );
}
