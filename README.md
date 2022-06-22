# JetEngine - example of custom map provider

This plugin provides an example of rewiting defual JetEngine map provider. You also can register completely new provider on `jet-engine/maps-listing/register-map-providers` hook. This example rewrites some existing provider. It useful if you need to add some layers to existing provider Map. For example draw some polygons etc.

Please note! If you rewrite some of default providers - you need to check the initial code after JetEngine updates.
