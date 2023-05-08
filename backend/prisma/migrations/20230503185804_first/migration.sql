-- CreateTable
CREATE TABLE "Lojista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfResponsavel" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "avaliacao" INTEGER NOT NULL DEFAULT 0,
    "creditos" REAL NOT NULL DEFAULT 0,
    "statusId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Lojista_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "nomeFantasia" TEXT NOT NULL,
    "razaoSocial" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpfResponsavel" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "avaliacao" INTEGER NOT NULL DEFAULT 0,
    "creditos" REAL NOT NULL DEFAULT 0,
    "radioAtendimento" INTEGER NOT NULL,
    "vezesIndicou" INTEGER NOT NULL DEFAULT 0,
    "condigoConvite" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Fornecedor_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "Status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "tpEndereco" INTEGER NOT NULL,
    "responsavelId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "Produto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoriaProduto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidadeProduto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProdutoTemp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoriaId" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "qtdInclusao" INTEGER NOT NULL,
    CONSTRAINT "ProdutoTemp_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categoriaProduto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutoTemp_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidadeProduto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "categoriaProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoria" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "unidadeProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "unidade" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lojista_cnpj_key" ON "Lojista"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Lojista_email_key" ON "Lojista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_condigoConvite_key" ON "Fornecedor"("condigoConvite");

-- CreateIndex
CREATE UNIQUE INDEX "Status_status_key" ON "Status"("status");

-- CreateIndex
CREATE UNIQUE INDEX "categoriaProduto_categoria_key" ON "categoriaProduto"("categoria");

-- CreateIndex
CREATE UNIQUE INDEX "unidadeProduto_unidade_key" ON "unidadeProduto"("unidade");
