package com.rmit.mgdb.config;

import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.core.WhitespaceTokenizerFactory;
import org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import org.apache.lucene.analysis.ngram.NGramFilterFactory;
import org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;
import org.springframework.stereotype.Component;

@Component
public class CustomLuceneAnalysisConfigurer implements LuceneAnalysisConfigurer {

    @Override
    public void configure(LuceneAnalysisConfigurationContext context) {
        context.analyzer("index_analyzer").custom()
               .tokenizer(WhitespaceTokenizerFactory.class)
               .tokenFilter(LowerCaseFilterFactory.class)
               .tokenFilter(SnowballPorterFilterFactory.class).param("language", "English")
               .tokenFilter(EdgeNGramFilterFactory.class).param("minGramSize", "1").param("maxGramSize", "15");

        context.analyzer("non_edge_index_analyzer").custom()
               .tokenizer(WhitespaceTokenizerFactory.class)
               .tokenFilter(LowerCaseFilterFactory.class)
               .tokenFilter(SnowballPorterFilterFactory.class).param("language", "English")
               .tokenFilter(NGramFilterFactory.class).param("minGramSize", "1").param("maxGramSize", "15");

        context.analyzer("search_analyzer").custom()
               .tokenizer(WhitespaceTokenizerFactory.class)
               .tokenFilter(LowerCaseFilterFactory.class)
               .tokenFilter(SnowballPorterFilterFactory.class).param("language", "English");

        context.normalizer("english").custom()
               .tokenFilter(LowerCaseFilterFactory.class)
               .tokenFilter(SnowballPorterFilterFactory.class).param("language", "English");
    }

}
