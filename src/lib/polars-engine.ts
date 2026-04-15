import pl from 'nodejs-polars';

/**
 * Motor de Inteligência Polars para o Solara Connect
 * Responsável por processamento de dados ultra-rápido de leads, pacientes e financeiro.
 */
export class PolarsEngine {
  /**
   * Analisa a conversão de leads e retorna insights estatísticos
   * @param leads Array de objetos de leads
   */
  static analyzeLeads(leads: any[]) {
    if (!leads.length) return null;

    // Converte para DataFrame do Polars
    const df = pl.readRecords(leads);

    // Exemplo de agregação ultra-rápida (coisa que o JS puro demoraria em sets grandes)
    const stats = df
      .groupBy("status")
      .agg(
        pl.count("id").alias("total"),
        pl.avg("score").alias("media_pontuacao")
      )
      .sort("total", true);

    return stats.toRecords();
  }

  /**
   * Identifica tendências de inadimplência ou cancelamento (Churn)
   */
  static detectChurnTrends(appointments: any[]) {
    const df = pl.readRecords(appointments);
    
    // Lógica para detectar padrões de pacientes que faltam muito
    const trends = df
      .filter(pl.col("status").eq(pl.lit("faltou")))
      .groupBy("paciente_id")
      .agg(pl.count("id").alias("faltas"))
      .filter(pl.col("faltas").gt(2));

    return trends.toRecords();
  }

  /**
   * Prepara o contexto para a IA (Gemini) usando Polars para resumir os dados
   */
  static prepareAIContext(history: any[]) {
    const df = pl.readRecords(history);
    
    // Resume o histórico limitando a complexidade para o prompt
    const summary = df
      .sort("data", true)
      .head(10)
      .select(["data", "tipo", "resumo"]);
      
    return summary.toRecords();
  }
}
