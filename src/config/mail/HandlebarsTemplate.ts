import handlebars from 'handlebars';
import fs from 'fs';

// interface das variaveis
// que podem ser enviadas para dentro de uma
// função
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    // le o arquivo passado por parametro
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    // passa as variaveis para dentro do aruqivo que deve ser
    // compilado
    return parseTemplate(variables);
  }
}
