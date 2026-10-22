# Uso: npm run evolucao:faixas
# Junta a mesma captura de cada versão (diario/evolucao/v*/) numa faixa horizontal.
import re
from pathlib import Path

from PIL import Image, ImageDraw

EVOLUCAO = Path('diario/evolucao')
SHOTS = ['01-abertura', '02-cores', '04-modo-claro']
THUMB = (480, 300)
GAP = 10
LABEL_HEIGHT = 40


def version_key(path):
    return tuple(int(n) for n in re.findall(r'\d+', path.name))


versions = sorted((p for p in EVOLUCAO.glob('v*') if p.is_dir()), key=version_key)

for shot in SHOTS:
    width = len(versions) * (THUMB[0] + GAP) + 30
    strip = Image.new('RGB', (width, THUMB[1] + LABEL_HEIGHT), (20, 20, 24))
    draw = ImageDraw.Draw(strip)
    for i, version in enumerate(versions):
        x = i * (THUMB[0] + GAP)
        strip.paste(Image.open(version / f'{shot}.png').resize(THUMB), (x, LABEL_HEIGHT))
        draw.text((x + 8, 14), version.name, fill=(235, 230, 215))
    name = shot.split('-', 1)[1]
    strip.save(EVOLUCAO / f'linha-do-tempo-{name}.png')
    print(f'linha-do-tempo-{name}.png ({len(versions)} versões)')
