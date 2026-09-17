import Modal from "../layout/Modal";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userActions } from "../../store/slices/userSlice";
import { useState } from "react";
import { updateUserAvatar } from "../../store/slices/userSlice";
import Cropper, { type Area } from "react-easy-crop";

import { getCroppedImage } from "../../utils/cropImage";

export default function AdjustAvatar({
  userId,
  isOpen,
  onClose,
  avatarUrl,
}: {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  avatarUrl: string;
}) {
  const dispatch = useAppDispatch();
  const updateStatus = useAppSelector((state) => state.user.isUpdating);


  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

async function saveAvatar() {
  if (!croppedAreaPixels) return;

  try {
    const croppedBlob = await getCroppedImage(
      avatarUrl,
      croppedAreaPixels
    );

    const croppedFile = new File(
      [croppedBlob],
      `avatar-${userId}.jpg`,
      {
        type: "image/jpeg",
      }
    );

    await dispatch(
      updateUserAvatar({
        userId,
        avatar: croppedFile,
      })
    ).unwrap();
    
    dispatch(userActions.setAvatar(URL.createObjectURL(croppedFile)));
    onClose();
  } catch (error) {
    console.error("Failed to save avatar:", error);
  }
}

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={saveAvatar}
      onSubmitting={updateStatus}
      saveText="Save"
      cancelText="Cancel"
      title="Adjust Avatar"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
          <Cropper
            image={avatarUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
          />
        </div>

        <div className="w-full">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="
    w-full
    h-2
    appearance-none
    cursor-pointer
    rounded-full
    bg-muted
    accent-primary

    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-primary
    [&::-webkit-slider-thumb]:shadow-md

    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:border-0
    [&::-moz-range-thumb]:bg-primary
    [&::-moz-range-thumb]:shadow-md
  "
          />
        </div>
      </div>
    </Modal>
  );
}
