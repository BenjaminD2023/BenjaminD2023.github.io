// --- Printable Top-Read D4 (All 3s) ---

// --- Settings ---
die_radius = 20;       // Size of the die
font_size = 6;         // Size of the number
text_depth = 1.2;      // How deep to carve

// DISTANCE ADJUSTMENT:
// How far from the sharp tip the center of the number sits.
tip_margin = 9.0;      

// --- Geometry Calculations ---
die_height = die_radius * sqrt(2); 
face_apothem = die_radius / 3;          // In a regular tetrahedron each side face centroid is R/3 from center
face_center_height = die_height / 3;    // Face centroids sit one-third of the way up from the base
tilt_angle = acos(1/3);                 // Angle between a face normal and the vertical axis of a tetrahedron

// The distance from face center to vertex (matches die_radius for this equilateral layout)
face_radius = die_radius; 

// --- Module: Face Numbers (3 numbers per face) ---
module face_numbers() {
    // We place numbers at 90 (Top), 210 (Left), 330 (Right) via 90 + 120*i
    for (i = [0 : 2]) {
        angle = 90 + (i * 120);
        
        rotate([0, 0, angle]) // Point towards the corner
        translate([0, face_radius - tip_margin, -text_depth]) 
        linear_extrude(text_depth * 2) // Extrude enough to overlap
        text("3", size=font_size, font="Arial:style=Bold", 
             halign="center", valign="center");
    }
}

// --- Main Construction ---
difference() {
    
    // 1. The Body (Rotated for alignment)
    rotate([0, 0, 180])
    cylinder(r1 = die_radius, r2 = 0, h = die_height, $fn=3);

    // 2. The Side Faces (Loop to apply to all 3 sides)
    for (i = [0 : 2]) {
        face_angle = 180 - (i * 120);     // Centers side faces at 180, 60, -60 around Z
        rotate([0, 0, face_angle])   
        translate([face_apothem, 0, face_center_height]) 
        rotate([0, tilt_angle, 0]) 
        rotate([0, 0, 180]) 
        face_numbers();
    }

    // 3. The Bottom Face
    rotate([180, 0, 0]) 
    face_numbers();
}
