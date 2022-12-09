# a partir da pasta raíz
find . -name *.test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt@3.1.1 #biblioteca para trabalhar com linha de comando para interagir transformando busca em painel interativo
find . -name *.js -not -path '*node_modules**' | ipt

#Na pasta da aula
cp -r ../../modulo01/aula07-tdd-project-pt03 .

CONTENT="'use strict';"
find . -name *.js -not -path '*node_modules**' \ # Procura todos os arquivos js
| ipt -o \ # Joga para o ipt(I Pipe To) com a opção -o(multipla seleção)
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\ 
/g' {file} # Joga o resultado para p xargs que vai criar a variável file com os arquivos retornado pelo ipt e para cada arquivo usa o "sed" pra editar e incluir na primeira lina 0 nosso $CONTENT e quebra a linha
# 1s primeita linha
# ^ primeira coluna
# substitui pelo $CONTENT(linha 11 deste arquivo)
# quebra de linha pra adicionar um \n