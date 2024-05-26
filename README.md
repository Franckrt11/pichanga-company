### Fixes por aplicar
En el package `@gorhom\bottom-sheet` agregar
```html
<GestureHandlerRootView>
```
En los archivos
- node_modules\@gorhom\bottom-sheet\src\components\bottomSheetHandleContainer\BottomSheetHandleContainer.tsx:135
- node_modules\@gorhom\bottom-sheet\src\components\bottomSheetBackdrop\BottomSheetBackdrop.tsx:159
- node_modules\@gorhom\bottom-sheet\src\components\bottomSheetDraggableView\BottomSheetDraggableView.tsx:110

Hasta que salga un nuevo update
