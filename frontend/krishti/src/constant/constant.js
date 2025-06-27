export function formatName(input) {
    return input
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

export const myWorkSubcats = ["design", "logo_design", "mask_making", "book_cover", "other"];
export const collegeWorkSubcats = ["model_making", "sand_art", "other"];