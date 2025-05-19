# Easy Setup AI

Um aplicativo para configuração rápida de recursos em um ambiente de desenvolvimento VTEX, incluindo Marcas, Categorias, Produtos, SKUs (incluindo preço e estoque), Pagamentos, Logística e Recursos B2B.

## Requisitos do Sistema

- Node.js 14.x ou superior
- VTEX CLI 2.x ou superior
- Conta VTEX com acesso administrativo
- Ambiente de desenvolvimento VTEX configurado
- Chave de API do OpenAI (GPT-4)

## Configuração da Chave da API

O aplicativo requer uma chave de API do OpenAI para funcionar. Você pode configurá-la de duas maneiras:

1. **Variável de Ambiente**:
   ```sh
   export OPENAI_API_KEY=sua-chave-api-aqui
   ```

2. **Configurações do App**:
   - Acesse o painel administrativo da VTEX
   - Vá para **STORE SETUP** &rarr; **Easy Setup**
   - Na seção de configurações, adicione sua chave da API do OpenAI

## Instalação

Instale o aplicativo usando o Toolbelt:

```sh
vtex install vtex.ai-easy-setup
```

Ou visite: `https://{{account}}.myvtex.com/admin/apps/vtex.ai-easy-setup/install` e siga as instruções.

## Uso

Após a instalação, siga os passos:

1. Acesse: **STORE SETUP** &rarr; **Easy Setup** (`https://{{account}}.myvtex.com/admin/ai-easy-setup`)
2. Preencha as opções para configurar o AI Easy Setup
3. Clique em "Start Easy Setup"
4. Confirme a ação no diálogo de confirmação
5. Aguarde a conclusão do processo

Para mais detalhes sobre os recursos disponíveis, consulte a [documentação completa](docs/README.md).

## Troubleshooting

### Problemas Comuns

1. **Erro ao criar recursos**
   - Verifique se você tem permissões administrativas
   - Tente executar novamente apenas os recursos problemáticos
   - Verifique os logs do aplicativo

2. **Erro de conexão**
   - Verifique sua conexão com a internet
   - Confirme se o ambiente VTEX está acessível
   - Verifique se o VTEX CLI está atualizado

3. **Erro de permissão**
   - Verifique se você está logado no VTEX CLI
   - Confirme se sua conta tem as permissões necessárias
   - Tente fazer logout e login novamente

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Changelog

### [1.0.0] - 2024-03-19
- Lançamento inicial
- Configuração básica de recursos VTEX
- Suporte a múltiplas categorias e produtos
- Configuração de preços e estoque
- Integração com logística e pagamentos

## Suporte

Para suporte, por favor abra uma issue no GitHub ou entre em contato com a equipe de suporte VTEX.

---

Para documentação detalhada sobre os recursos disponíveis, consulte a [documentação completa](docs/README.md). 