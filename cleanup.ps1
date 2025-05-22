# Script para limpeza do projeto
# Remove a pasta static_backup e componentes em inglês

# Remover pasta static_backup
Write-Host "Removendo pasta static_backup..." -ForegroundColor Yellow
Remove-Item -Path "c:\Users\edgle\Desktop\fgtparte2\projetofgt\static_backup" -Recurse -Force -ErrorAction SilentlyContinue

# Remover produtos.html da raiz (se existir)
Write-Host "Removendo arquivos HTML estáticos adicionais..." -ForegroundColor Yellow
Remove-Item -Path "c:\Users\edgle\Desktop\fgtparte2\projetofgt\produtos.html" -Force -ErrorAction SilentlyContinue

# Remover componentes em inglês (que já têm versão em português)
Write-Host "Removendo componentes em inglês..." -ForegroundColor Yellow
$componentsInEnglish = @(
    "ProductCard",
    "ProductFilter",
    "ProductListHeader",
    "ProductListItem",
    "ProductSorting",
    "RatingFilter"
)

foreach ($component in $componentsInEnglish) {
    $path = "c:\Users\edgle\Desktop\fgtparte2\projetofgt\src\components\$component"
    Write-Host "Removendo $component..." -ForegroundColor Cyan
    Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
}

# Remover páginas em inglês (que já têm versão em português)
Write-Host "Removendo páginas em inglês..." -ForegroundColor Yellow
$pagesInEnglish = @(
    "ProductDetailPage"
)

foreach ($page in $pagesInEnglish) {
    $path = "c:\Users\edgle\Desktop\fgtparte2\projetofgt\src\pages\$page"
    Write-Host "Removendo $page..." -ForegroundColor Cyan
    Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
}

Write-Host "Limpeza concluída!" -ForegroundColor Green
