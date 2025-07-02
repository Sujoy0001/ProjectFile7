export function formatName(input) {
    return input
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export const myWorkSubcats = [
  "design",
  "photoshop_work",
  "painting",
  "fabric_painting",
  "craft_work",
  "photography",
  "others",
];

export const collegeWorkSubcats = [
  "painting",
  "batik_work",
  "pencil_sketch",
  "screen_printing",
  "book_cover_design",
  "mask_making",
  "logo_making",
  "design",
  "jute_bag_making",
  "glass_painting",
  "sand_art_design",
  "tie_dye",
  "woodcut_painting",
  "others",
];
