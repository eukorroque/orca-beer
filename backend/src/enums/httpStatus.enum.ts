export enum HttpStatus {
  
  CONTINUE = 100, //  Indica que o servidor recebeu os headers da requisição e está aguardando o restante da requisição.
  
  SWITCHING_PROTOCOLS = 101, //  Indica que o servidor está mudando o protocolo usado na conexão.
  
  PROCESSING = 102, //  Indica que o servidor está processando a requisição, mas ainda não tem uma resposta completa.
  
  EARLYHINTS = 103, //  Indica que o servidor está enviando informações adicionais que podem ajudar o cliente a preparar a resposta.
  
  OK = 200, //  Indica que a requisição foi bem sucedida.
  
  CREATED = 201, // Indica que a requisição foi bem sucedida e que um novo recurso foi criado.
  
  ACCEPTED = 202, // Indica que a requisição foi recebida, mas ainda não foi processada.
  
  NON_AUTHORITATIVE_INFORMATION = 203, // Indica que a resposta é uma representação do estado do recurso, mas pode não ser a versão mais atualizada.
  
  NO_CONTENT = 204, // Indica que a requisição foi bem sucedida, mas não há conteúdo para ser enviado de volta.
  
  RESET_CONTENT = 205, // Indica que a requisição foi bem sucedida e que o cliente deve resetar a view que está exibindo.
  
  PARTIAL_CONTENT = 206, // Indica que a resposta é apenas uma parte da requisição original, especificada no header "Range".
  
  AMBIGUOUS = 300, // Indica que a requisição tem mais de uma possível resposta.
  
  MOVED_PERMANENTLY = 301, // Indica que o recurso solicitado foi movido permanentemente para um novo local.
  
  FOUND = 302, // Indica que o recurso solicitado foi encontrado em um novo local temporariamente.
  
  SEE_OTHER = 303, // Indica que o cliente deve fazer uma nova requisição para um novo recurso.
  
  NOT_MODIFIED = 304, // Indica que o cliente pode usar a sua cópia cacheada do recurso, pois ele não foi modificado desde a última vez que foi solicitado.
  
  TEMPORARY_REDIRECT = 307, // Indica que o cliente deve fazer uma nova requisição para um novo recurso, mas usando o mesmo método HTTP da requisição original.
  
  PERMANENT_REDIRECT = 308, // Indica que o cliente deve fazer uma nova requisição para um novo recurso, mas usando o mesmo método HTTP da requisição original.
  
  BAD_REQUEST = 400, // Indica que a requisição é inválida ou mal formada.
  
  UNAUTHORIZED = 401, // Indica que o cliente não está autorizado a acessar o recurso solicitado.
  
  PAYMENT_REQUIRED = 402, // Indica que o recurso solicitado requer pagamento.
  
  FORBIDDEN = 403, // Indica que o cliente não tem permissão para acessar o recurso solicitado.
  
  NOT_FOUND = 404, // Indica que o recurso solicitado não foi encontrado no servidor.
  
  METHOD_NOT_ALLOWED = 405, // Indica que o método HTTP utilizado na requisição não é permitido para o recurso solicitado.
  
  NOT_ACCEPTABLE = 406, // Indica que o recurso solicitado não está disponível em um formato compatível com as preferências do cliente.
  
  PROXY_AUTHENTICATION_REQUIRED = 407, // Indica que o cliente deve se autenticar com o proxy antes de prosseguir com a requisição.
  
  REQUEST_TIMEOUT = 408, // Indica que o tempo de espera para a resposta da requisição expirou.
  
  CONFLICT = 409, // Indica que a requisição conflita com o estado atual do servidor.
  
  GONE = 410, // Indica que o recurso solicitado não está mais disponível no servidor.
  
  LENGTH_REQUIRED = 411, // Indica que a requisição está faltando o header "Content-Length", que é obrigatório para a maioria dos tipos de requisição.
  
  PRECONDITION_FAILED = 412, // Indica que um ou mais headers da requisição não foram satisfeitos pelo servidor.
  
  PAYLOAD_TOO_LARGE = 413, // Indica que o payload da requisição é muito grande para ser processado pelo servidor.
  
  URI_TOO_LONG = 414, // Indica que o URI da requisição é muito longo para ser processado pelo servidor.
  
  UNSUPPORTED_MEDIA_TYPE = 415, // Indica que o tipo de mídia da requisição não é suportado pelo servidor.
  
  REQUESTED_RANGE_NOT_SATISFIABLE = 416, // Indica que o servidor não pode satisfazer o intervalo de bytes solicitado na requisição "Range".
  
  EXPECTATION_FAILED = 417, // Indica que um ou mais headers da requisição têm um valor incompatível com a ação solicitada.
  
  I_AM_A_TEAPOT = 418, // Indica que o servidor é uma chaleira (teapot) e não pode atender à solicitação como um servidor HTTP normal.
  
  MISDIRECTED = 421, // Indica que a requisição foi direcionada a um servidor inapropriado.
  
  UNPROCESSABLE_ENTITY = 422, // Indica que a requisição está bem formada, mas não pode ser processada pelo servidor.
  
  FAILED_DEPENDENCY = 424, // Indica que a requisição falhou devido a uma dependência não atendida.
  
  PRECONDITION_REQUIRED = 428, // Indica que a requisição requer que o cliente satisfaça um ou mais headers de pré-condição.
  
  TOO_MANY_REQUESTS = 429, // Indica que o cliente atingiu o limite de requisições para o período de tempo definido pelo servidor.
  
  INTERNAL_SERVER_ERROR = 500, // Indica que ocorreu um erro interno no servidor ao processar a requisição.
  
  NOT_IMPLEMENTED = 501, // Indica que a requisição não foi implementada pelo servidor.
  
  BAD_GATEWAY = 502, // Indica que o servidor está atuando como um gateway ou proxy e recebeu uma resposta inválida do servidor upstream.
  
  SERVICE_UNAVAILABLE = 503, // Indica que o servidor está temporariamente indisponível para processar a requisição devido a uma sobrecarga temporária ou manutenção do servidor.
  
  GATEWAY_TIMEOUT = 504, // Indica que o servidor está atuando como um gateway ou proxy e que a requisição expirou ou falhou ao receber uma resposta a tempo.
  
  HTTP_VERSION_NOT_SUPPORTED = 505 // Indica que a versão HTTP usada na requisição não é suportada pelo servidor.
}
