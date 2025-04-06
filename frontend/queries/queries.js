export const highway_query = `
      [out:json][timeout:100];
      (way[highway]
        (
          36.72398412345187,
   	      10.001727255982814,
          36.74050698680756,
          10.025224131320357
        );
      );
        out body;
        >;
        out skel qt;
      `;

export const building_query = `
[out:json][timeout:100];
      (node["building"]
       (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
       way["building"]
       (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
       relation["building"]
        (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
      );
        out body;
        >;
        out skel qt;
        `;

export const address_query = `
[out:json][timeout:100];
      (
       node["addr:housenumber"]
       (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
       way["addr:housenumber"]
       (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
      );
        out body;
        >;
        out skel qt;
        `;

export const water_query = `
[out:json][timeout:100];
      (
       way["water"]
       (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
       relation["water"]
        (
          36.80697611816896,
          10.136795558181547,
          36.81102811921565,
          10.140848587892748
        );
      );
        out body;
        >;
        out skel qt;
        `;
