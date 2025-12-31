Technologies Used:
1) Next.js - Eleminates the need react navigation (external liberary), App router (page, layout) architecture makes development easier.
2) Typescript - used to make ensure type safet;y that helped me reduce bugs while coding.
3)svg image generation - this helped me support direct svg image downloads and ensured infinite zoom without quality distortion.
4)DOM Events - Used these to give user control over canvas, like zooming and panning

Libraries Used: 
1)Redux Toolkit- Helped me manage data and states centrally. Ensured clear boundary betweem data and UI.
2) Tailwind Css - Facilitated easy styling while creating modern Design.
3) next-themes - Helped me easily integrate light and dark themes.


Overall Architecture and Approach:
1)Used Redux Toolkit to handle data storage, updates, cleaning, node addition, expand/collapse state, and neighbor highlighting logic.
2)Created custom hooks (useMindmap, useUi, useCanvasDrag) to cleanly extract data and interactions for UI components.
3)Custom SVG Canvas with 3-phase radial layout algorithm (root center → outward branching → collision resolution) for infinite zoom and crisp rendering.
4)Data-driven pipeline: JSON → resolveJson.ts → Redux nodes/links → Canvas.useMemo(layout) → SVG render.
5)Neighbor highlighting: Selected node → compute parent/children → gold glow on links/nodes via isNeighbor prop.
6)Interaction layer: Mouse events → Redux dispatch → reactive re-render → smooth 300ms transitions.
7)Performance optimized: useMemo for layout, useCallback for handlers, SVG defs for gradients.

How Data Flows from Json to UI

1) user inputs raw json with following format
   {
    label,
    summary,
    description,
    children : [{}, {}, ...]
   }

2) This json is clean by a lib file called resolveJsoon and seperated into 2 arrays- nodes and Links.
3) We use This array to generate the graph on the canvas.



Please Find the Google Drive link attached to screenShots and a demo video to the app:

[Google Drive Link](https://drive.google.com/drive/folders/1DoB9_nqhpcLU6fwHkThEqaRy6d7UDf53?usp=drive_link)
